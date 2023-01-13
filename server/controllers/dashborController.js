const Note = require("../models/Notes");
const mongoose = require("mongoose");

/* GET /
dashbor 
*/
exports.dashbor = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  const locals = {
    title: "Dashbor",
    description: "Aplikasi NodeJs Gratis",
  };

  try {
    // const notes = await Note.find({});
    // console.log(notes);
    Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function (err, notes) {
        Note.count().exec(function (err, count) {
          if (err) return next(err);
          res.render("dashbor/index", {
            userName: req.user.firstName,
            locals,
            notes,
            layout: "../views/layouts/dashbor",
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * View Specific Note
 */
exports.dashborTampilNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashbor/lihat-note", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashbor",
    });
  } else {
    res.send("Terjadi kesalahan.");
  }
};

/**
 * PUT /
 * Update Specific Note
 */
exports.dashborUpdetNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/dashbor");
  } catch (error) {
    console.log(error);
  }
};

/**
 * DELETE /
 * Delete Note
 */
exports.dashborHapusNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashbor");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Add Notes
 */
exports.dashborAddNote = async (req, res) => {
  res.render("dashbor/tambah", {
    layout: "../views/layouts/dashbor",
  });
};

/**
 * POST /
 * Add Notes
 */
exports.dashborAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashbor");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Search
 */
exports.dashborCari = async (req, res) => {
  try {
    res.render("dashbor/search", {
      searchResults: "",
      layout: "../views/layouts/dashbor",
    });
  } catch (error) {}
};

/**
 * POST /
 * Search For Notes
 */
exports.dashborCariSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashbor/cari", {
      searchResults,
      layout: "../views/layouts/dashbor",
    });
  } catch (error) {
    console.log(error);
  }
};
