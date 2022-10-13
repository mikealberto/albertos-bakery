var express = require('express');
var router = express.Router();
const passport = require("passport");
/* GET home page. */
//FIX: will have to adjust this route to relate with my project
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Google OAuth login route
//when the link gets push in your page it will trigger this reques
router.get("/auth/google", passport.authenticate(
  "google", 
  {
    scope: ['profile', 'email'],
    //to optionally force pick account every time
    prompt: "select_account"
  }
));

// //Google OAuth Callback route
// router.get("/oauth2callback", passport.authenticate(
//   "google", 
//   {
//     successRedirect: 
//   }
// ));

module.exports = router; 