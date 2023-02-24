const Tweet = require("../models/Tweet");
const User = require("../models/User");

// Display the specified resource.
async function index(req, res) {
  const tweets = await Tweet.find().populate("author");
  res.json(tweets);
}

async function show(req, res) {
  const tweetId = req.params.id;
  const tweet = await Tweet.findById(tweetId);
  res.json(tweet);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const user = await User.findOne();

  await Tweet.create({
    content: req.body.content,
    date: new Date(),
    likes: 0,
    author: req.user._id,
  });

  res.redirect("/");
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.

async function destroy(req, res) {
  const tweetId = req.params.id;
  await Tweet.findByIdAndDelete(tweetId);
  const user = await User.find({ _id: tweetId });

  res.redirect(`/usuarios/${req.user.username}`);
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
