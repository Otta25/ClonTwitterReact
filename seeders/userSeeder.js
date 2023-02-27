/**
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 */

const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  /**
   * Escribir código del seeder aquí...
   */
  const users = [];
  const totalUsers = 20;

  for (let i = 0; i < totalUsers; i++) {
    let password = await bcrypt.hash("1234", 8);
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      username: faker.internet.userName(firstname, lastname),
      email: faker.internet.email(firstname, lastname, "hack.dev"),
      bio: faker.lorem.sentences(1),
      photoProfile: faker.image.avatar(),
      photoPortada: faker.image.abstract(879, 338),
      password: password,
      following: users.sort(() => 0.5 - Math.random()).slice(0, 5),
    });
    users.push(user);
  }

  let adminGladys = new User({
    firstname: "Gladys",
    lastname: "Manya",
    username: "Gladys.Manya",
    email: "gladys@admin",
    bio: "Abuela. Manya. Diosa.",
    photoProfile: "2fc67ba844840bcd35d358b00.jpeg",
    photoPortada: "portada.jpg",
    password: await bcrypt.hash("1234", 8),
    following: users,
  });
  users.push(adminGladys);

  for (const user of users) {
    const randomUser = users[faker.datatype.number({ min: 0, max: totalUsers - 1 })];
    user.following.push(randomUser);
    randomUser.followers.push(user);
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
