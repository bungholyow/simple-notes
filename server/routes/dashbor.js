const express = require("express");
const router = express.Router();
const dashborController = require("../controllers/dashborController");
const { isLoggedIn } = require("../middleware/checkAuth");

// dasbor route
router.get("/dashbor", isLoggedIn, dashborController.dashbor);

router.get(
  "/dashbor/item/:id",
  isLoggedIn,
  dashborController.dashborTampilNote
);
router.put("/dashbor/item/:id", isLoggedIn, dashborController.dashborUpdetNote);

router.get("/dashbor/tambah", isLoggedIn, dashborController.dashborAddNote);
router.post(
  "/dashbor/tambah",
  isLoggedIn,
  dashborController.dashborAddNoteSubmit
);

router.delete(
  "/dashbor/item-hapus/:id",
  isLoggedIn,
  dashborController.dashborHapusNote
);

router.get("/dashbor/cari", isLoggedIn, dashborController.dashborCari);
router.post("/dashbor/cari", isLoggedIn, dashborController.dashborCariSubmit);

module.exports = router;
