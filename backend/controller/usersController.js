const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No user found!" });
  }
  res.json(users);
});
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  //data validate
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are require." });
  }
  //check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "User already exists." });
  }

  //password hash
  const hashPassword = await bcrypt.hash(password, 10);

  const userObj = { username, password: hashPassword, roles };

  //create new user
  const user = await User.create(userObj);
  await Note.create({
    user: "64ca003237e4eb86575fdc3c",
    title: "bala bala",
    text: "hooooooo",
  });
  if (user) {
    //created
    res.status(201).json({ message: `New User ${username} is created.` });
  } else {
    res.status(400).json({ message: "Invalid User data Received." });
  }
});
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;
  //data validation
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "Invalid user data" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User Not Found." });
  }
  //duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: `UserName Already Exists.` });
  }
  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    //hash password
    let newPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ username }, { $set: { password: newPassword } });
  }
  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated.` });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: " User id not Found" });
  //if notes is exists , user cann't delete
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).json({ message: "User has assigned note." });
  }
  //if note is no assigned , delete that user
  const user = await User.findById(id).exec();
  if (!user) {
    //user no found in database
    return res.status(400).json({ message: "User not found" });
  }
  const result = await user.deleteOne();

  const reply = `Username ${result.username} with Id  ${result._id} deleted`;
  res.json(reply);
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
