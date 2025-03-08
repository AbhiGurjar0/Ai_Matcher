const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // profilePicture: {
    //   type: String, // Store image URL or path if using local storage
    //   default: "",
    // },
    // role: {
    //   type: String,
    //   enum: ["user", "admin"], // Role-based access
    //   default: "user",
    // },
    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt timestamps
);

// Export the User model
module.exports = mongoose.model("User", userSchema);
