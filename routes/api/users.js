const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load inout validation 
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//Load Usere model 
const User = require('../../models/User');

// @route  GET request to api/users/rest
// @desc   Tests users route
// @access Public
router.get('/test', (req,res) => res.json({msg: "Users Works"}));

// @route  GET request to api/users/register
// @desc   Register user 
// @access Public

router.post('/register', (req,res) => {
  const { errors, isValid } = validateRegisterInput(req.body); //everything that is sent to this route
    
    // Check Validation
    if(!isValid) {
      return res.status(400).json(errors);
    }
  
  User.findOne({ email: req.body.email })
  .then(user => {
    if(user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm' //default
      });
      
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      
      bcrypt.genSalt(10, (err, salt) => {  // password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
          
        })
      })
    }
  })
});



// @route  GET request to api/users/login
// @desc   Login User / Returning JWT Token
// @access Public

router.post('/login', (req,res) => {
   const { errors, isValid } = validateLoginInput(req.body); //everything that is sent to this route
    
    // Check Validation
    if(!isValid) {
      return res.status(400).json(errors);
    }
    
  const email = req.body.email;
  const password = req.body.password;
  
  // Find the user by email
  User.findOne({email}).then(user => {
    // Check for user 
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors);
    }
    
    // Check password
    bcrypt.compare(password, user.password)  //user.password is the hashed password
      .then(isMatch => {  // True or false
        if(isMatch)  {//if user passed, then token is generated
          // User Matched
          
          
          const payload = { id: user.id, name: user.name, avatar: user.avatar } // Create jwt payload
          
          // Sign Token
          jwt.sign(
            payload, 
            keys.secretOrKey, 
            { expiresIn: 3600 }, //expires in an hour
            (err, token) => { 
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
          });
            
          } else {
            errors.password = 'Password incorrect'
          return res.status(400).json(errors);
        }
      });
  });
});

// @route  GET request to api/users/current
// @desc   Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req,res) => {
  //res.json(req.user);  //sending the user info through the correct token 
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,   //without sending the password
  })
});

module.exports = router;

