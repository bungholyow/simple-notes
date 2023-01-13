const express = require("express");
const router = express.Router();
const dashborController = require("../controllers/dashborController");
const { isLoggedIn } = require("../middleware/checkAuth");

// dasbor route
router.get("/dashbor", isLoggedIn, dashborController.dashbor);
router.get("/dashbor/tambah", isLoggedIn, dashborController.dashboardAddNote);
router.post(
  "/dashbor/tambah",
  isLoggedIn,
  dashborController.dashboardAddNoteSubmit
);

module.exports = router;
