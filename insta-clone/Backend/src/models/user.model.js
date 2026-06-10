const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exist"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "account is already exist withn this email"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  bio: String,
  profileImg: {
    type: String,
    default:
      "https://ik.imagekit.io/bvw4esqqt/avatar-default-user-profile-icon-simple-flat-vector-57234190.webp",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
