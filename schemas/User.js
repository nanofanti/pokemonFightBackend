const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Signup function
UserSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use al least 8 characters, one upper case, one lower case, a number and a symbol"
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //User creation
  const user = await this.create({
    email,
    password: hash,
  });

  return user;
};

//Login function
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email incorrect or doesn't exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};

module.exports = mongoose.model("User", UserSchema);
