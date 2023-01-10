const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// route untuk App
router.get("/", mainController.beranda);
router.get("/about", mainController.about);

module.exports = router;
