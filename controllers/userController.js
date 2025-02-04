const User = require("../models/User");
const Tweet = require("../models/Tweet");
const formatDistanceToNow = require("date-fns/formatDistanceToNow");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");

// Display a listing of the resource.
async function index(req, res) {
  const user = await User.find();
  res.json({ user });
}

// Display the specified resource.
async function show(req, res) {
  const id = req.params.id;
  const users = await User.find();
  const user = await User.findById(id);
  const tweets = await Tweet.find().sort({ date: -1 }).populate("author");
  const tweetAuthor = await Tweet.findOne({ author: user }).populate("author");
  const data = { user, tweets };
  res.json({ data });
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "public/img/userPhotos",
    keepExtensions: true,
  });
  try {
    form.parse(req, async (err, fields, files) => {
      let password = await bcrypt.hash(fields.password, 8);
      console.log(files.img);
      const user = await User.create({
        firstname: fields.firstname,
        lastname: fields.lastname,
        email: fields.email,
        username: fields.username,
        photoProfile: "https://ionicframework.com/docs/img/demos/avatar.svg",
        password: password,
      });
      await user.save();
      res.json("User created successfully");
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User creation failed",
      error: err.message,
    });
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

async function followers(req, res) {
  try {
    const usuario = await User.findById(req.params.id).populate("followers");
    res.json(usuario.followers);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function following(req, res) {
  try {
    const usuario = await User.findById(req.params.id).populate("following");
    res.json(usuario.following);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}
// Otros handlers...
// ...

const followUser = async (req, res) => {
  console.log("toy");
  const followerId = req.params.id;
  const userId = req.auth.userId;
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { following: followerId },
    });
    await User.findByIdAndUpdate(followerId, {
      $addToSet: { followers: userId },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al seguir al usuario",
      error: error.message,
    });
  }
};

const unfollowUser = async (req, res) => {
  const userId = req.auth.userId;
  const followerId = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { following: followerId },
    });
    await User.findByIdAndUpdate(followerId, { $pull: { followers: userId } });
    return res.redirect("back");
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
