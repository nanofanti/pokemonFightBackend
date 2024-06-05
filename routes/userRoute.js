const express = require("express");

const {
  signUpUser,
  loginUser,
  updateUserPokemons,
} = require("../controllers/user");

const apiUser = express.Router();

apiUser.route("/:id").put(updateUserPokemons);

apiUser.route("/signup").post(signUpUser);

apiUser.route("/login").post(loginUser);

module.exports = apiUser;
