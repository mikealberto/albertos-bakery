const Bread = require("../models/bread");

module.exports = {index, show};

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

function show (req, res) {
    Bread.findById(req.params.id)
        .then(function(bread) {
            res.render("breads/show", {title: `${bread.name}`, bread});
        })
        .catch(function(err) {
            console.log(err);
            process.exit();
        }); 

};