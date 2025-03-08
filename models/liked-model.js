const mongoose = require("mongoose");

const likedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  description: String,
  link: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LikedModel = mongoose.model("LikedModel", likedSchema);
module.exports = LikedModel;
