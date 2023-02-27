const User = require("../models/User");
const Tweet = require("../models/Tweet");

// Display a listing of the resource.
async function index(req, res) {
  const user = await User.findOne();
  res.render("pages/profile", { user });
}

// Display the specified resource.
async function show(req, res) {
  const username = req.params.id;
  const users = await User.find();
  const user = await User.findOne({ username: username });
  const tweets = await Tweet.find({ author: user }).sort({ date: -1 });
  const tweetAuthor = await Tweet.findOne({ author: user }).populate("author");

  res.render("pages/profile", { user, tweets, tweetAuthor, req, users });
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
  const usernameProfile = await User.find({ username: req.params.id });
  const followsProfile = usernameProfile[0].followers;
  const follows = await User.find({ _id: followsProfile });
  const userLogged = await User.findById(req.user._id);
  const user = await User.find(req.user);

  res.render("pages/followers", { follows, req, user, usernameProfile, userLogged });
}

async function following(req, res) {
  const usernameProfile = await User.find({ username: req.params.id });
  const followsProfile = usernameProfile[0].following;
  const follows = await User.find({ _id: followsProfile });

  res.render("pages/following", { follows, req, usernameProfile });
}
// Otros handlers...
// ...

const followUser = async (req, res) => {
  const { userId } = req.body;
  const followerId = req.user._id;
  const userName = req.user.username;
  const rute = req.url;
  console.log(rute);

  try {
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { followers: followerId } });
    await User.findByIdAndUpdate(followerId, { $addToSet: { following: userId } });

    if (rute === `/followers/follow`) {
      return res.redirect(`/usuarios/followers/${userName}`);
    } else return res.redirect(`/usuarios/following/${userName}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al seguir al usuario",
      error: error.message,
    });
  }
};

const unfollowUser = async (req, res) => {
  const { userId } = req.body;
  const followerId = req.user._id;
  const userName = req.user.username;
  const rute = req.url;
  console.log(rute);

  try {
    const user = await User.findByIdAndUpdate(userId, { $pull: { followers: followerId } });
    await User.findByIdAndUpdate(followerId, { $pull: { following: userId } });

    if (rute === `/followers/unfollow`) {
      return res.redirect(`/usuarios/followers/${userName}`);
    } else return res.redirect(`/usuarios/following/${userName}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al dejar de seguir al usuario",
      error: error.message,
    });
  }
};

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
  unfollowUser,
  followUser,
};
