// Requiring & Mounting Express - Required to run Node Apps.
const express = require("express");
const app = express();

// Requiring Body Parser - Required to parse req.body, which is how the body of the HTTP request can be viewed.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Requiring BCrypt - Required for password security.
const bcrypt = require("bcryptjs");

// Requiring Cookie Session - Required for encrypting cookies.
const cookieSession = require("cookie-session");
app.use(cookieSession({
  keys: ["mynameisahsan"] // Key required to ecrypt and decrypt the cookies. Does this need to be in a .env file?
}));

// Mounting the EJS Template
app.set("view engine", "ejs");

// Setting PORT
const PORT = process.env.PORT;