const { expressjwt: checkjwt } = require("express-jwt");

// // async function ensureAuthenticated(req, res, next) {
// //   ;
// //   next();
// // }

// async function ensureAuthenticated(req, res, next) {
//   jwt.verify(token, process.env.SESSION_SECRET, function (err, decoded) {
//     if (err) {
//       console.log(err);
//     } else {
//       next();
//     }
//   });
// }

const ensureAuthenticated = checkjwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] });

module.exports = ensureAuthenticated;
