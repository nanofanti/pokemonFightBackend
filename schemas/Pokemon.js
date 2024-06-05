const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  id: { type: Number },
  pokemonName: {
    type: String,
  },
  pokemonType: [{ type: String }],
  base: {
    HP: { type: Number },
    Attack: { type: Number },
    Defense: { type: Number },
    SpecialAttack: { type: Number },
    SpecialDefense: { type: Number },
    Speed: { type: Number },
  },
  pokemonMainPic: {
    type: String,
  },
  moves: [{ type: String }],
  sound: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Pokemon", PokemonSchema);
