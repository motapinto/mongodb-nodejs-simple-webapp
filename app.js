// Express
const express = require("express");
const app = express();

//Method override to use other methods other than POST and GET in HTML5
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Built-in body-parser from express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS with express
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express session
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport (authentication middleware)
const passport = require("passport");
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Flash messages after redirect
const flash = require("connect-flash");
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Mongo DB
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
// .env for db configs (hide db connection credentials)
require("dotenv/config");
// Establishes connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};
connect();

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
app.use("/dashboard", require("./routes/dashboard.js"));

const PORT = 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
