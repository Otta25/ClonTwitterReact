const Tweet = require("../models/Tweet");
const User = require("../models/User");
const lodash = require("lodash");
const jwt = require("jsonwebtoken");

// Display the specified resource.
async function index(req, res) {
  const tweets = await Tweet.find().sort({ date: -1 }).populate("author");
  res.json(tweets);
}

async function show(req, res) {
  const tweetId = req.params.id;
  const tweet = await Tweet.findById(tweetId).populate("author");
  res.json(tweet);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const day = new Date();
  const newTweet = await Tweet.create({
    content: req.body.content,
    date: new Date(),
    author: req.auth.userId,
  });

  res.json(newTweet);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const tweetId = req.params.id;
  await Tweet.findByIdAndDelete(tweetId);
  res.json("tweet eliminado");
}

//agregar like
async function addLike(req, res) {
  const tweet = await Tweet.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.auth.userId } },
    { new: true },
  );
  res.json(tweet);
}

//quitar like
async function deleteLike(req, res) {
  const tweet = await Tweet.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.auth.userId } },
    { new: true },
  );
  res.json(tweet);
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  addLike,
  deleteLike,
};
