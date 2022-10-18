//will only be exporting the middleware function from this file
module.exports = function isLoggedIn(req, res, next) {
    //pass the next res/req to the NEXT middleware/route handler 
    if (req.isAuthenticated()) return next();
    //function redirect login if user is not yet logged in 
    res.redirect("/auth/google");
}