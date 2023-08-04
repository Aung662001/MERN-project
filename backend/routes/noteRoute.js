const express = require("express");
const router = express.Router();
const noteController = require("../controller/noteController");
const verifyJWT = require("../middleware/verifyJWT");
router
  .use(verifyJWT)
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.createNewNotes)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);
module.exports = router;
