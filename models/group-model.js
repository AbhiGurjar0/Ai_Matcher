const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Group name
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Group members
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Group admin
  createdAt: { type: Date, default: Date.now } // Timestamp
});

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;