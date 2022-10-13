const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");

passport.use(
    new GoogleStrategy(
        //Configuration Object
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK
        }, 
        //verify callback function 
        //use the profile resource that google provides in order to create user documents for application
        //this function: finds the user or creates the user; and then keeps the function going 
        async function(accessTocken, refreshToken, profile, cb) {
            //A user has logged in with OAuth
            try {
                //returns promise with the user embeded inside of it
                let user = await User.findOne({googleId: profile.id});
                //user is either null or a valid user
                //cb is a function provided by passport
                //first arguments is our err object
                if (user) return cb(null, user);
                //we have new user via OAuth
                user = await User.create({
                    name: profile.displayName,
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value
                });
                return cb(null, user);
            } catch(err) {
                return cb(err);
            }


        }
    )
); 

//this function: takes the user that was previously created and add it to the session(used to track the user)
//anticipates 2 argument the user that was just created, another cb function
//the way to think of the callback is at keeps the process going. Like the third next parameter
passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

//in this method we want passport to assign to the req.user object
passport.deserializeUser( async function(userId, cb){
    try {
        const user = await User.findById(userId);
        cb(null, user);
    } catch (err) {
        cb(err);
    }
});