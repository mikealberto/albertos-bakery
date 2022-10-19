const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");
const isLoggedIn = require("../config/auth");

//isLoggedIn for that extra layer of security
router.post("/breads/:id/reviews", isLoggedIn, reviewsCtrl.create);
//delete functionality
router.delete("/reviews/:id", isLoggedIn, reviewsCtrl.delete);
//edit functionality
router.get("/:id/edit", isLoggedIn, reviewsCtrl.edit);

module.exports = router;

