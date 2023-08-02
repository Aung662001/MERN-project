const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const noteSchema = new mongoose.Schema(
  {
    _id: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
    registration: {
      number: { type: Number },
    },
  },
  {
    timestamps: true,
  },
  {
    _id: false,
  }
);
noteSchema.plugin(AutoIncrement);
module.exports = mongoose.model("Note", noteSchema);
