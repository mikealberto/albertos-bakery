var express = require('express');
var router = express.Router();
const passport = require("passport");
/* GET home page. */
//FIX: will have to adjust this route to relate with my project
router.get('/', function(req, res, next) {
  res.render('index', { title: "Alberto's Bakery" });
});

// Google OAuth login route
//when the link gets push in your page it will trigger this request
router.get("/auth/google", passport.authenticate(
  "google", 
  {
    scope: ['profile', 'email'],

    //if you already consented once you won't receive account prompt
    //so to optionally force pick account every time
    prompt: "select_account"
  }
));

//Google OAuth Callback route
//After the user has consented google needs to know which route on our server to hit with the resources 
router.get("/oauth2callback", passport.authenticate(
  "google",
  {
    //EXPERIMENT:
    successRedirect: "/breads",
    failureRedirect: "/"
  }
));

// OAuth Logout Route
router.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if (err) return next (err)
    res.redirect("/");
  });
});



module.exports = router; 