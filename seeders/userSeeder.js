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
  const totalUsers = 10;

  for (let i = 0; i < totalUsers; i++) {
    let password = await bcrypt.hash("1234", 8);
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      bio: faker.lorem.paragraph(),
      photoProfile: faker.image.avatar(),
      password: password,
    });
    users.push(user);
  }

  for (const user of users) {
    const randomUser = users[faker.datatype.number({ min: 0, max: totalUsers - 1 })];
    user.following.push(randomUser);
    randomUser.followers.push(user);
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
