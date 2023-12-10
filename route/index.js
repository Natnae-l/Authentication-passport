const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// get requests
router.get("/", async (req, res, next) => {
  let users = req.user;
  res.render("index", {user: users})
  });
router.get("/sign-up", (req, res, next) => res.render("sign-up-form"));
router.get("/log-in", (req, res, next) => {
  res.render("login");
});
router.get('/log-out', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/log-in');
  });
});

// post requests
router.post("/sign-up", async (req, res, next) => {

  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) console.log(err)
      try {
        const user = new User({
          username: req.body.username,
          password: hashedPassword
        });
        const result = await user.save();
        console.log(result)

        res.redirect("/");
      } catch(err) {
        return next(err);
      };
  });
    
  });

router.post('/log-in', 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in'
  })
)

module.exports = router;