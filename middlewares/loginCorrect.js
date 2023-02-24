const User = require("../models/User");
const bcrypt = require("bcryptjs");

const loginCorrect = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    console.log("Credenciales Incorrectas");
    return res.redirect("/login");
  }

  const correctPassword = await bcrypt.compare(req.body.password, user.password);
  if (!correctPassword) {
    console.log("Credenciales Incorrectas2");
    return res.redirect("/login");
  } else {
    next();
  }
};

module.exports = loginCorrect;
