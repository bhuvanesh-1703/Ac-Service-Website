const mongoose = require("mongoose");

const USerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "customer" },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", USerSchema);
