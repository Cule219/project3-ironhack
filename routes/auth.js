const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", (req, res)=>{
  passport.authenticate("local", (err, user)=>{
    if(err) {
      return res.status(500).json({message: "Error while authenticating"});
    }else if(!user) {
      return res.status(401).json({message: "Invalid credentials"});
    }
    req.login(user, err =>{
      if(err) {
        return res.status(500).json({message: "Error while attempting to log in"});
      }
      return res.status(200).json(user);
    });
  })(req, res);
});

router.post("/signup", (req, res) => {
  const {username, password, profileImg, githubLink, role, submitUser} = req.body;
  if (username === "" || password === "") {
    res.status(400).json({ message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(409).json({ message: "The username already exists" });
      return; 
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      profileImg,
      githubLink,
      role
    });
    newUser.save()
    .then(newUser => {
      if(!submitUser){
      req.login(newUser, err => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error while attempting to login" });
        }
        res.status(200).json(newUser);
      });}
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong" });
    })
  });
});

router.post("/logout", (req, res) => {
  req.logout()
  res.json({message: 'done'})
  //this needs to be checked out
  // res.status(200);
});

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});


//github auth
router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.status(200).json({message: "Working"});
});

router.get('/trello', passport.authenticate('trello'));

module.exports = router;
