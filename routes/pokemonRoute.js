const express = require("express");

const {
  createOnePokemon,
  getOnePokemon,
  getAllPokemon,
} = require("../controllers/pokemon");

const api = express.Router();

api.route("/").post(createOnePokemon).get(getAllPokemon);

api.route("/:id").get(getOnePokemon);

module.exports = api;
