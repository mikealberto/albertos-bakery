const Bread = require("../models/bread");

module.exports = {
    create
}

function create(req, res) {
    Bread.findById(req.params.id)
        .then(function(bread) {
            req.body.user = req.user._id;
            req.body.userName = req.user.name;
            req.body.userAvatar = req.user.avatar;
            bread.reviews.push(req.body)
            bread.save().then(function() {
                res.redirect(`/breads/${bread._id}`);
            });
        })
        .catch(function(err) {
            console.log(err);
            process.exit();
        });
}
