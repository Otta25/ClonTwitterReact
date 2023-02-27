const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const { format, formatDistance, formatRelative, subDays } = require("date-fns");
// Configurar el idioma de Faker
faker.locale = "es";

module.exports = async () => {
  // Crear un array vacío para almacenar los tweets que vamos a crear
  const tweets = [];

  // Obtener todos los usuarios existentes
  const users = await User.find();

  // Crear 10 tweets aleatorios
  for (let i = 0; i < 10; i++) {
    // Crear un nuevo tweet con datos aleatorios utilizando Faker
    const tweet = new Tweet({
      content: faker.lorem.sentence(5),
      date: new Date(),
      likes: [],
      // Asignar un autor aleatorio de la lista de usuarios
      author: users[Math.floor(Math.random() * users.length)],
    });

    // Encontrar el usuario que escribió este tweet
    const user = await User.findById(tweet.author);

    // Añadir el tweet al array de tweets y al array de tweets del usuario
    tweets.push(tweet);

    // Guardar los cambios en la base de datos para el usuario
    await user.save();
  }

  for (const tweet of tweets) {
    const randomNumber = faker.datatype.number({ min: 1, max: 10 });
    const randomUser = await User.findOne().skip(randomNumber);
    tweet.userId = randomUser;
    randomUser.tweets.push(tweet);
  }

  // Insertar todos los tweets creados a la vez en la base de datos
  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de Tweets.");
};
