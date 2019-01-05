const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
//Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected")) //success
  .catch(err => console.log(err)); //errors
// app.get('/', (req,res) => res.send('Hello'));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Server static assets if in production
// For Heroku (production build)
if (process.env.NODE_ENV === "production") {
  // Set static folder if in production mode
  app.use(express.static("client/build"));

  // create route and load the index.html file from build folder
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Port
const port = process.env.PORT || 5000;
//const port = 8081 || 5000;
//const ip = process.env.IP || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
//app.listen(8082, () => console.log(`Server running on ${port}`))
