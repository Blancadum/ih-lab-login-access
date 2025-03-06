const createError = require("http-errors");
const User = require("../models/user");

// 📌 Crear un nuevo usuario
module.exports.create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// 📌 Obtener perfil del usuario autenticado
module.exports.profile = (req, res, next) => {
  res.json(req.user);
};

// 📌 Listar todos los usuarios (opcional)
module.exports.list = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Excluye la contraseña
    res.json(users);
  } catch (error) {
    next(error);
  }
};
