const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");
const users = require("../controllers/users.controller");
const sessions = require("../controllers/sessions.controller");
const auth = require("../middlewares/session.middleware"); // Middleware de autenticación

// 📌 Rutas de Usuarios
router.post("/users", users.create); // Crear usuario
router.get("/users/me", auth.checkSession, users.profile); // Perfil protegido

// 📌 Rutas de Sesión
router.post("/sessions", sessions.create); // Iniciar sesión
router.delete("/sessions", auth.checkSession, sessions.destroy); // Cerrar sesión protegida

// 📌 Middleware para Rutas No Encontradas (404)
router.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// 📌 Middleware Global de Manejo de Errores
router.use((error, req, res, next) => {
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  ) {
    error = createError(404, "Resource not found");
  } else if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (!error.status) {
    error = createError(500, "Internal Server Error");
  }

  console.error(`[ERROR] ${error.status}: ${error.message}`);

  const data = {
    message: error.message,
  };

  if (error.errors) {
    data.errors = Object.keys(error.errors).reduce((errors, key) => {
      errors[key] =
        error.errors[key]?.message || error.errors[key];
      return errors;
    }, {});
  }

  res.status(error.status).json(data);
});

module.exports = router;
