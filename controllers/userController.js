const User = require("../models/User");
const Tweet = require("../models/Tweet");

// Display a listing of the resource.
async function index(req, res) {
  const user = await User.findOne();
  res.render("pages/profile", { user });
}

// Display the specified resource.
async function show(req, res) {
  const username = req.params.username;
  const user = await User.findOne({ username: username });
  const tweets = await Tweet.find({ author: user }).sort({ date: -1 });
  const tweetAuthor = await Tweet.findOne({ author: user }).populate("author");
  console.log(tweets.length);
  res.render("pages/profile", { user, tweets, tweetAuthor, req });
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

async function followers(req, res) {
  res.render("pages/followers");
}

async function following(req, res) {
  res.render("pages/following");
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
  followers,
  following,
};
