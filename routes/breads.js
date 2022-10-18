const express = require("express");
const router = express.Router();
const breadsCtrl = require("../controllers/breads");
// const { routes } = require("../server");
const isLoggedIn = require("../config/auth");

//All routes initiate with /breads 

//index functionality 
router.get("/", breadsCtrl.index);

//show functionality
router.get("/:id", breadsCtrl.show);

module.exports = router;