const express = require("express");
const router = express.Router();
const breadsCtrl = require("../controllers/breads");
const { routes } = require("../server");

//All routes initiate with /breads 

router.get("/", breadsCtrl.index);

module.exports = router;