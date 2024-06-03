const Pokemon = require("../schemas/Pokemon");

const createOnePokemon = async (req, res) => {
  const { id, pokemonName, pokemonType, base, pokemonMainPic, moves, sound } =
    req.body;
  try {
    const createdPokemon = await Pokemon.create({
      id,
      pokemonName,
      pokemonType,
      base,
      pokemonMainPic,
      moves,
      sound,
    });
    res.status(201).json({
      message: "Pokemon created successfully",
      data: createdPokemon,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOnePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findOne({ id });
    if (!pokemon) {
      res.status(404).json({ message: "This pokemon is not in the database" });
    } else {
      res.status(200).json({ data: pokemon });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllPokemon = async (req, res) => {
  try {
    const allPokemon = await Pokemon.find();
    if (!allPokemon.length) {
      res.status(200).json({ message: "No Pokemon in the DB" });
    } else {
      res.status(200).json({ pokemons: allPokemon });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { createOnePokemon, getOnePokemon, getAllPokemon };
