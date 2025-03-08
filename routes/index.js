const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const checkLogin = require("../middlewares/checkLogin");
const aiModel = require("../models/ai-model");
const userModel = require("../models/user-model");
const likeModel = require("../models/liked-model");
const LikedModel = require("../models/liked-model");

const API_KEY = "AIzaSyBJugRYoq83e5UUuDQLgZt96Fbm8aBGAjw"; 
const CSE_ID = "93f648795e4364d10"; 

router.get("/search", async (req, res) => {
  const query = req.query.q || " ";

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
        query
      )}&cx=${CSE_ID}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); 

  
    res.render("search", { data: data.items });
  
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});
router.get("/", async (req, res) => {
  try {
    let error = req.flash("error");
    res.render("index", { error, user: req.user });
  } catch (err) {
    console.error(err);
    // res.render("index");
  }
});

router.get("/login", async (req, res) => {
  try {
    let error = req.flash("error");
    res.render("login", { error });
  } catch (err) {
    console.error(err);
    // res.render("index");
  }
});
router.get("/hero", isLoggedIn, async (req, res) => {
  try {
    let error = req.flash("error");
    // let user = await userModel.findOne({email:req.email})
    res.render("home", { error, user: req.user });
  } catch (err) {
    console.error(err);
    // res.render("index");
  }
});


router.post("/like", isLoggedIn, async (req, res) => {
  try {
    const { title, description, link } = req.body;

    if (!title || !description || !link) {
      return res.status(400).json({ error: "Missing AI model data" });
    }

    // Check if AI model already exists in AIModel
    let AiModel = await aiModel.findOne({ name: title });

    if (!AiModel) {
      // If not found, create a new AI model
      AiModel = await aiModel.create({
        name: title,
        description,
        website: link,
        category: "Image", // Default category, change as needed
      });
    }

    // Save to LikedModel
    await LikedModel.create({
      userId: req.user._id, // Ensure user ID is valid
      title,
      description,
      link,
    });

    res.redirect("/like"); // Redirect to liked models page
  } catch (err) {
    console.error("Error saving liked model:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/like", isLoggedIn, async (req, res) => {
  try {
    const likedProducts = await LikedModel.find({ userId: req.user._id });

    if (!likedProducts.length) {
      console.log("No liked AI models found.");
      return res.render("liked", { like: [] });
    }
    res.render("liked", { like: likedProducts });
  } catch (err) {
    console.error("Error fetching liked AI models:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/remove/:id", isLoggedIn, async (req, res) => {
  try {
    // Delete the liked AI model entry
    await LikedModel.findByIdAndDelete(req.params.id);

    res.redirect("/like"); // Redirect to the liked models page
  } catch (err) {
    console.error("Error removing liked AI model:", err);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/submit-review/:id", isLoggedIn, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const AiModel = await aiModel.findById(req.params.id);

    if (!AiModel) {
      return res.status(404).send("AI Model not found");
    }

    // Add the new review
    AiModel.reviews.push({
      user: req.user.username, // Assuming user has a 'username' field
      rating: parseInt(rating),
      comment: comment,
    });

    // Update average rating
    AiModel.totalRatings += 1;
    AiModel.rating =
      AiModel.reviews.reduce((sum, r) => sum + r.rating, 0) /
      AiModel.totalRatings;

    await AiModel.save();
    res.redirect(`/details/${AiModel._id}`); // Redirect to model details page
  } catch (err) {
    console.error("Error submitting review:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/details/:id",async function (req, res) {
  let model = await aiModel.findOne({_id:req.params.id});
  res.render("aiDetails",{model});
});
router.get("/review/:id", isLoggedIn, async (req, res) => {
  try {
    // console.log("Received Name:", req.params.id);

    // Decode name (for spaces in URL)
    const aiModelName = decodeURIComponent(req.params.id);

    // Find AI Model by name (case-insensitive)
    const AiModel = await aiModel.findOne({
      name: new RegExp("^" + aiModelName + "$", "i"),
    });

    if (!AiModel) {
      console.log("AI Model not found in DB");
      return res.status(404).send("AI Model not found");
    }

    // console.log("Fetched AI Model:", AiModel);
    res.render("review", { model: AiModel });
  } catch (err) {
    console.error("Error loading review page:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
