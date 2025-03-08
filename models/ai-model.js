const mongoose = require("mongoose");

const AIModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0 // Average rating
    },
    totalRatings: {
        type: Number,
        default: 0 // Number of users who rated
    },
    category: {
        type: String,
        enum: ["imagegenerative", "Image", "Video", "Voice"],
        required: true
    },
    website: {
        type: String, 
        required: true
    },
    reviews: [
        {
          user: String,
          rating: Number,
          comment: String,
          date: { type: Date, default: Date.now },
        },
      ],
});

module.exports = mongoose.model("AIModel", AIModelSchema);
