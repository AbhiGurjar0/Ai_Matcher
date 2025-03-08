const express = require("express");
const router = express.Router();
const AIModel = require("../models/ai-model");
const userModel = require("../models/user-model");

const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        return next();
    }
    req.flash("error", "Unauthorized Access");
    res.redirect("/admin/login");
};

router.get("/login", (req, res) => {
    res.render("adminLogin");
});

router.get("/dashboard", async (req, res) => {
    const models = await AIModel.find().sort({ createdAt: -1 });
    const user = await userModel.find();
    res.render("adminDashboard", { models,user  });
});
router.post("/dashboard", async (req, res) => {
    const models = await AIModel.find().sort({ createdAt: -1 });
    const user = await userModel.find();
    res.render("adminDashboard", { models ,user }); 
});

router.get("/add", isAdmin, (req, res) => {
    res.render("admin/addModel");
});

router.post("/add", isAdmin, async (req, res) => {
    try {
        const { name, description, category, website, image } = req.body;
        const newAI = new AIModel({ name, description, category, website, image });
        await newAI.save();
        req.flash("success", "AI Model added successfully!");
        res.redirect("/admin/dashboard");
    } catch (err) {
        req.flash("error", "Error adding AI model");
        res.redirect("/admin/add");
    }
});


router.get("/delete/:id", isAdmin, async (req, res) => {
    await AIModel.findByIdAndDelete(req.params.id);
    req.flash("success", "AI Model deleted!");
    res.redirect("/admin/dashboard");
});



module.exports = router;

module.exports = router;
