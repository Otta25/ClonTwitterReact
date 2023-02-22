const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

faker.locale = "es";

module.exports = async () => {
  /**
   * Escribir código del seeder aquí...
   */
  const tweets = [];

  for (let i = 1; i < 10; i++) {
    tweets.push({
      content: faker.lorem.sentence(5),
      date: new Date(),
      likes: faker.datatype.number({ min: 0, max: 10 }),
    });
  }

  await Tweet.insertMany(tweets);

  console.log("[Database] Se corrió el seeder de Users.");
};

// content: {
//     type: String,
//     maxlength: 140,
//   },
//   date: new Date(),
//   likes: Number,
