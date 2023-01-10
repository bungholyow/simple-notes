/* GET /
Beranda 
*/
exports.beranda = async (req, res) => {
  const locals = {
    title: "NodeJs Notes",
    description: "Aplikasi NodeJs Gratis",
  };

  res.render("index", {
    locals,
    layout: "../views/layouts/tampilan-depan",
  });
};

/* GET /
about 
*/
exports.about = async (req, res) => {
  const locals = {
    title: "About Us",
    description: "About us...",
  };

  res.render("about", locals);
};
