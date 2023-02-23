const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (username, password, cb) {
        // Este código sólo se llama si username y password están definidos.
        console.log("[LocalStrategy] Username:", username); // To-Do: Borrar este `console.log` luego de hacer pruebas.
        console.log("[LocalStrategy] Password:", password); // To-Do: Borrar este `console.log` luego de hacer pruebas.

        try {
          const user = await User.findOne({ username: username });
          if (!user) {
            console.log("Nombre de usuario no existe.");
            return cb(null, false, { message: "Credenciales incorrectas." });
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            console.log("La contraseña es inválida.");
            return cb(null, false, { message: "Credenciales incorrectas." });
          }
          console.log("Credenciales verificadas correctamente");
          return cb(null, user);
        } catch (error) {
          cb(error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    console.log("[Passport] Serialize User");
    // Completar código...
  });

  passport.deserializeUser(async (id, done) => {
    console.log("[Passport] Deserialize User");
    // Completar código...
  });
};

// module.exports = (app) => {

//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passwordField: "password",
//       },
//       async (username, password, cb) => {
//         try {
//           const user = await User.findOne({ where: { email: username } });
//           if (!user) {
//             console.log("Nombre de usuario no existe.");
//             return cb(null, false, { message: "Credenciales incorrectas." });
//           }
//           const match = await bcrypt.compare(password, user.password);
//           if (!match) {
//             console.log("La contraseña es inválida.");
//             return cb(null, false, { message: "Credenciales incorrectas." });
//           }
//           console.log("Credenciales verificadas correctamente");
//           return cb(null, user);
//         } catch (error) {
//           cb(error);
//         }
//       },
//     ),
//   );

//   passport.serializeUser((user, cb) => {
//     cb(null, user.id);
//   });

//   passport.deserializeUser(async (id, cb) => {
//     try {
//       const user = await User.findByPk(id);
//       cb(null, user);
//       // Usuario queda disponible en req.user.
//     } catch (err) {
//       cb(err);
//     }
//   });
// };
