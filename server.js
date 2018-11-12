const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
//Routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected')) //success
    .catch(err => console.log(err)); //errors
// app.get('/', (req,res) => res.send('Hello'));

// Passport Middleware 
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//Use routes 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//Port
//const port = process.env.PORT || 5000;
const port = 8081 || 5000;
const ip = process.env.IP || 5000;

app.listen(port, () => console.log(`Server running on port ${port} and ip ${ip}`));
//app.listen(8082, () => console.log(`Server running on ${port}`))
