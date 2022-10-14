//Still have to require bread model

module.exports = {index};

function index (req, res) {
    res.render("breads/index", {title: "Breads"});
};