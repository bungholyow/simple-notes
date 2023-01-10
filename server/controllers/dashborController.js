/* GET /
dashbor 
*/
exports.dashbor = async (req, res) => {
  const locals = {
    title: "Dashbor",
    description: "Aplikasi NodeJs Gratis",
  };

  res.render("dashbor/index", {
    locals,
    layout: "../views/layouts/dashbor",
  });
};
