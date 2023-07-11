const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (username, email, password) {
  // validation
  if (!username) {
    throw Error("username is a required field!");
  }

  if (!email) {
    throw Error("email is a required field!");
  }

  if (!password) {
    throw Error("password is a required field!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (username, password) {
  //
  if (!username) {
    throw Error("username is a required field!");
  }

  if (!password) {
    throw Error("password is a required field!");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Incorrect username!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password!");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
