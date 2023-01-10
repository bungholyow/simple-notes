const express = require("express");
const router = express.Router();
const dashborController = require("../controllers/dashborController");

// dasbor route
router.get("/dashbor", dashborController.dashbor);

module.exports = router;
