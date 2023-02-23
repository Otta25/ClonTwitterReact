const { mongoose, Schema } = require("../db");

// Crear esquema y modelo User...

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  bio: String,
  photoProfile: String,
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
