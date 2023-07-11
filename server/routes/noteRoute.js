const express = require("express");
const auth = require("../middlewares/auth");

const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.use(auth);

// get all notes
router.get("/", getNotes);

// get a note
router.get("/:id", getNote);

// create a note
router.post("/", createNote);

// update a note
router.patch("/:id", updateNote);

// delete a note
router.delete("/:id", deleteNote);

module.exports = router;
