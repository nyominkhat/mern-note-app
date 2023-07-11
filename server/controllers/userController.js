const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign(
    {
      _id: _id,
    },
    process.env.SECRET,
    { expiresIn: "3d" }
  );
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    // token
    const token = createToken(user._id);
    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    // token
    const token = createToken(user._id);
    res.status(201).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
