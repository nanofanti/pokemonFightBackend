const express = require("express");

const { signUpUser, loginUser } = require("../controllers/user");

const apiUser = express.Router();

apiUser.route("/signup").post(signUpUser);

apiUser.route("/login").post(loginUser);

module.exports = apiUser;
