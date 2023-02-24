const formidable = require("formidable");
const User = require("../models/User");

async function showHome(req, res) {
  res.render("pages/home");
}

async function login(req, res) {
  res.render("pages/log-in");
}

async function showContact(req, res) {
  res.render("pages/contact");
}

async function showAboutUs(req, res) {
  res.render("pages/aboutUs");
}

async function store(req, res) {
  console.log(__dirname);
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    let user = await User.create({
      firstname: fields.firstname,
      lastname: fields.lastname,
      email: fields.email,
      username: fields.username,
      photoProfile: files.file.newFilename,
      password: fields.password,
    });
    await user.save();
  });
  return res.redirect("/");
}

async function show404(req, res) {
  res.status(404).render("pages/404");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showContact,
  showAboutUs,
  login,
  store,
};
