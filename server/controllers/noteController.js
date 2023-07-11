const mongoose = require("mongoose");

const Note = require("../models/noteModel");

// get all notes
const getNotes = async (req, res) => {
  const user_id = req.user._id;

  const notes = await Note.find({ user_id }).sort({ createdAt: -1 });

  if (!notes) {
    return res.status(400).json({ error: "No such notes!" });
  }

  res.status(200).json(notes);
};

// get a note
const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Id!" });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ error: "Invalid Id!" });
  }

  res.status(200).json(note);
};

// create a note
const createNote = async (req, res) => {
  const { title, text } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title is required field!" });
  }

  if (!text) {
    return res.status(400).json({ error: "text is required field!" });
  }

  try {
    const user_id = req.user._id;

    const note = await Note.create({ title, text, user_id });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Id!" });
  }

  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      user_id,
    }
  );

  if (!note) {
    return res.status(400).json({ error: "Invalid Id!" });
  }

  res.status(200).json(note);
};

// delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Id!" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    return res.status(400).json({ error: "Invalid Id!" });
  }

  res.status(200).json(note);
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
