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
exports.tentang = async (req, res) => {
  const locals = {
    title: "tentang notes",
    description: "tentang notes...",
  };

  res.render("tentang", locals);
};
