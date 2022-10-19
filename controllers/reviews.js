const Bread = require("../models/bread");

module.exports = {
    create, delete: deleteReview, edit, update
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

async function deleteReview(req, res) {
    try {
        const bread = await Bread.findOne({
            "reviews._id" : req.params.id,
            "reviews.user": req.user._id
        })
        // console.log(bread); DELETE
        //if statement is true if bread is undefined
        if(!bread) return res.redirect("/breads");
        bread.reviews.remove(req.params.id);
        await bread.save();
        res.redirect(`/breads/${bread._id}`);
    } catch (err) {
        console.log(err);
        process.exit();
    }
}

function edit (req, res) {
    res.render( "reviews/edit", {
        title: "Review Form Update",
        reviewId: req.params.id
    });
}

function update(req, res) {
    const reviewId = req.params.id;
    Bread.findOne({
        "reviews_id": reviewId,
        "reviews.user": req.user.id
    })
        .then(function(bread) {
            //if statement is true if bread is undefined
            if(!bread) return res.redirect("/breads");

            for (const review of bread.reviews) {
                if (review._id.equals(reviewId)) {
                    review.content = req.body.content;
                    review.rating = req.body.rating;
                }
            }
            bread.save().then(function() {
                res.redirect(`/breads/${bread._id}`);
            })
        })
        .catch(function(err) {
            console.log(err);
            process.exit();
        })
}