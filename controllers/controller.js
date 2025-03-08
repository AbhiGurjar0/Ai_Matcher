const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
module.exports.registerUser = async function (req, res) {
  try {
    // Check if req.body exists
    if (!req.body || !req.body.email || !req.body.password || !req.body.name) {
      req.flash("error", "All fields are required");
      return res.redirect("/login");
    }

    let { email, password, name } = req.body;

    // Ensure email is a string before using trim()
    if (typeof email !== "string") {
      req.flash("error", "Invalid email format");
      return res.redirect("/login");
    }

    email = email.trim().toLowerCase(); // Sanitize email

    let user = await userModel.findOne({ email });

    if (user) {
      req.flash("error", "Email already exists");
      return res.redirect("/login");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Fix 'fullname' to 'name' (Ensure it matches model schema)
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      name, // Use 'name' instead of 'fullname'
    });

    let token = generateToken(newUser);
    res.cookie("token", token);
    req.flash("success", "Account created successfully! You can login");
    return res.redirect("/login");
  } catch (err) {
    console.error("Register Error:", err.message);
    req.flash("error", "Something went wrong during registration");
    return res.redirect("/login");
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;
    if (!password) {
      req.flash("error", "Password is required");
      return res.redirect("/login");
    }
    let user = await userModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      req.flash("error", "email or password incorrect  ");
      return res.redirect("/login");
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        return res.redirect("/hero");
      } else {
        req.flash("error", "email or password incorrect ");
        return res.redirect("/login");
      }
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    req.flash("error", "Something went wrong during login");
    return res.redirect("/login");
  }
};
module.exports.logout = function (req, res) {
  res.cookie("token", "");
  return res.redirect("/login");
};
