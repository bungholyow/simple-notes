const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// route untuk App
router.get("/", mainController.beranda);
router.get("/tentang", mainController.tentang);

module.exports = router;
