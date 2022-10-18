const Bread = require("../models/bread");

module.exports = {index};

function index (req, res) {
    Bread.find({})
        .then(function(allBreads) {
            res.render("breads/index", {title: "Breads", breads: allBreads});
        })
        .catch(function(err) {
            console.log(err);
            process.exit();
        });

};