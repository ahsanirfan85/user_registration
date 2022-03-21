"use strict";

// Web Server Configuration

  // (1) Requiring Dot ENV to load environment variables into process.env
  require('dotenv').config()

  // (2) Setting PORT
  const PORT = process.env.PORT;

  // (3) Requiring & Mounting Express - Required to run Node Apps.
  const express = require("express");
  const app = express();
  app.use(express.static("public")); // Required to serve static files.

  // (4) Requiring Body Parser - Required to parse req.body, which is how the body of the HTTP request can be viewed.
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({extended: true}));

  // (5) Requiring BCrypt - Required for password security.
  const bcrypt = require("bcryptjs");

  // (6) Requiring Cookie Session - Required for encrypting cookies.
  const cookieSession = require("cookie-session");
  app.use(cookieSession({keys: ["mynameisahsan"]})); // Key required to ecrypt and decrypt the cookies. Does this need to be in a .env file?

  // (7) Mounting the EJS Template
  app.set("view engine", "ejs");

  // (8) Configuring the Heroku Database
  const { Client  } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  client.connect();


// HTTP Routes

  // (1) GET Requests

    // (A) When you first access the website (GET Request)
    app.get("/", (req, res) => {
    const templateVars = {

    }
    res.render("unlogged", templateVars);
    console.log("User accessed the website.");
    });

    // (B) GET Request to the login page
    app.get("/login", (req, res) => {
      const templateVars = {
  
      }
    res.render("login", templateVars);
    console.log("User accessed the login page.");
    });

    // (C) GET Request to the Register page
    app.get("/register", (req, res) => {
    const templateVars = {

    }
    res.render("register", templateVars);
    console.log("User accessed the register page.");
    });
  
  // (2) POST Requests

    // (A) Registering a user; POST request to Register page
    app.post("/register", (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      console.log(email);
      console.log(password);
      client.query(`
      INSERT INTO users (email, password)
      VALUES ($1,$2)
      RETURNING *;
      `,[email, password])
        .then(data => {
          console.log(data.rows[0]);
        })
        .catch(error => {
          res
            .status(500)
            .json({ error: error.message  });
          console.log(error.message);
        });
    });

// Listen Function
app.listen(PORT, ()=> {
  console.log(`Server is listening for requests on port ${PORT}`);
});