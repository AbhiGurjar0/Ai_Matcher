const express = require("express");
const router = express.Router();
const AIModel = require("../models/ai-model");
const upload = require("../config/multer-config"); // Adjust path as needed

router.post("/add-model", upload.single("image"), async (req, res) => {
    try {
        const { name, description, category, website } = req.body;

        if (!req.file) {
            return res.status(400).send("Image is required.");
        }

        // Convert image buffer to Base64 or store it directly in MongoDB
        const newModel = new AIModel({
            name,
            description,
            category,
            website,
            image: {
                data: req.file.buffer, 
                contentType: req.file.mimetype, // Store MIME type
            },
        });

        await newModel.save(); 
        res.redirect("/admin/dashboard"); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;



// Get All AI Models (Sorted by Rating)
router.get("/all", async (req, res) => {
    try {
        const models = await AIModel.find().sort({ rating: -1 });
        res.json(models);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
