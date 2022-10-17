const Bread = require("../models/bread");

module.exports = {index};

function index (req, res) {
    res.render("breads/index", {title: "Breads"});
};