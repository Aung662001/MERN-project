const express = require("express");
const router = express.Router();
const noteController = require("../controller/noteController");

router
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.createNewNotes)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);
module.exports = router;
