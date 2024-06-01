const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDB = require("./dbinit");
const pokemon = require("./routes/pokemonRoute");

app.use(express.json());
app.use(cors());
connectDB();

app.use(express.urlencoded({ extended: true }));

app.use("/pokemon", pokemon);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to PokeFight API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
