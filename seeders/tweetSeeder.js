const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

faker.locale = "es";

module.exports = async () => {
  /**
   * Escribir código del seeder aquí...
   */
  const tweets = [];

  const users = await User.find();
  const user = await User.findOne();

  for (let i = 1; i < 10; i++) {
    const tweet = new Tweet({
      content: faker.lorem.sentence(5),
      date: new Date(),
      likes: faker.datatype.number({ min: 0, max: 10 }),
      author: users[Math.floor(Math.random() * 10)],
    });

    tweets.push(tweet);
    user.tweets.push(tweet);
  }
  //const firstAuthor = await Tweet.find().populate("author");

  //console.log(firstAuthor[3].author.firstname);

  await Tweet.insertMany(tweets);
  await user.save();
  console.log("[Database] Se corrió el seeder de Users.");
};
