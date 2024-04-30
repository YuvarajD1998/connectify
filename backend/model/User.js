const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, min: 3, max: 20, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilephoto: { type: String, default: "" },
  coverphoto: { type: String, default: "" },
  followers: { type: Array, default: [] },
  followings: { type: Array, default: [] },
  isAdmin: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  desc: {
    type: String,
    max: 50,
  },
  city: {
    type: String,
    max: 50,
  },
  from: {
    type: String,
    max: 50,
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3],
  },
});
module.exports = mongoose.model("user", userSchema);
