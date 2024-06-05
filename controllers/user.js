const Pokemon = require("../schemas/Pokemon");
const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

//Create token
const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "3h" });
};

const signUpUser = async (req, res) => {
  const { email, password, nickName } = req.body;
  try {
    const user = await User.signup(email, password, nickName);

    const token = createToken(user._id);

    res.status(201).json({
      _id: user._id,
      email,
      nickName,
      password,
      token,
      Pokemon: user.userPokemons,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      email,
      nickName: user.nickName,
      token,
      Pokemon: user.userPokemons,
      message: "Login successfull",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update userPokemons
const updateUserPokemons = async (req, res) => {
  try {
    const { userPokemons } = req.body;
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { userPokemons },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "I don't know this user" });
    } else {
      res
        .status(200)
        .json({ message: "User updated successfully", data: user });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = { signUpUser, loginUser, updateUserPokemons };
