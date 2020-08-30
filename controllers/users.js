const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

// Login page
async function getUserLogin(req, res) {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

// Register page
async function getUserRegister(req, res) {
  try {
    res.render("register");
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

// Login handle
async function postUserLogin(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
}

// Register handle
async function postUserRegister(req, res) {
  let { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields!" });
  }
  if (password !== password2) {
    errors.push({ msg: "Passwords don't not match!" });
  }

  if (errors.length > 0 || (await User.findOne({ email: email }))) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  // Hash Password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err;
      newUser.password = hash;

      try {
        await newUser.save();
        req.flash("success_msg", "You are now register and can login");
        res.status(200).redirect("/users/login");
      } catch (err) {
        res.status(500).json({ message: err });
      }
    })
  );
}
// Logout handle
async function getUserLogout(req, res) {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
}

module.exports = {
  getUserLogin,
  getUserRegister,
  postUserLogin,
  postUserRegister,
  getUserLogout,
};
