const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes?.length) {
    //if no note
    return res.status(400).json({ message: "Not Post Found." });
  }
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );
  res.json(notesWithUser);
});
const createNewNotes = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;
  console.log(req.body);
  //data vilaidation
  console.log("validation data");
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //duplicate check
  console.log("check duplicate");
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    console.log("duplicate");
    return res.status(400).json({ message: "Note Title already exists" });
  }
  //create new note
  console.log("creationg note");
  const note = await Note.create({ user, title, text });
  console.log(note, "created note");
  if (note) {
    //created successfull
    console.log("note created");
    return res.status(201).json({ message: "New Note Created" });
  } else {
    return res.status(400).json({ message: "Invalid Note Data Received" });
  }
});
const updateNote = asyncHandler(async (req, res) => {
  //
  const { id, user, title, text, complete } = req.body;
  //data validation
  if (!id || !user || !title || !text || typeof complete !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }
  //search to updae note
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found " });
  }
  //duplicate check
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Title already exist!" });
  }
  //update
  note.user = user;
  note.title = title;
  note.text = text;
  note.complete = complete;

  const update = await note.save();
  res.json({ message: `${update.title} updated` });
});
const deleteNote = asyncHandler(async () => {
  const { id } = req.body;
  //data validation
  if (!id) {
    return res.status(400).json({ message: "Id field is required!" });
  }
  //search note
  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: "Note not found with that id" });
  }
  //delete
  const result = await note.deleteOne();
  res.json({ message: `${result.title} with ID ${result._id} id deleted` });
});
module.exports = { getAllNotes, createNewNotes, updateNote, deleteNote };
