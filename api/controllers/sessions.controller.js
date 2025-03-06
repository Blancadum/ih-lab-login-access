const bcrypt = require("bcryptjs");
const Session = require("../models/session.model");
const User = require("../models/user");
const createError = require("http-errors");

module.exports.create = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Email o contraseña incorrectos");
    }

    // 2. Verificar la contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw createError(401, "Email o contraseña incorrectos");
    }

    // 3. Crear sesión
    const session = await Session.create({ user: user._id });

    // 4. Enviar sesión en una cookie segura
    res.cookie("session_id", session._id, {
      httpOnly: true, // Solo accesible por el servidor
      secure: process.env.NODE_ENV === "production", // HTTPS en producción
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 24, // Expira en 1 día
    });

    res.json({ message: "Login exitoso", user });
  } catch (error) {
    next(error);
  }
};

module.exports.destroy = async (req, res, next) => {
  try {
    const sessionId = req.cookies.session_id;
    if (!sessionId) {
      return res.status(204).send();
    }

    // 1. Eliminar sesión de la base de datos
    await Session.findByIdAndDelete(sessionId);

    // 2. Limpiar la cookie de sesión
    res.clearCookie("session_id");

    res.status(204).send(); // No devuelve contenido, solo indica éxito
  } catch (error) {
    next(error);
  }
};
