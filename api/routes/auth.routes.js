const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const sessionsController = require("../controllers/sessions.controller");
const auth = require("../middlewares/session.middleware");

// ✅ Ruta para registrar un usuario
router.post("/users", usersController.create);

// ✅ Ruta para iniciar sesión
router.post("/sessions", sessionsController.create);

// ✅ Ruta protegida: obtener perfil del usuario si la sesión está activa
router.get("/users/me", auth.checkSession, usersController.profile);

// ✅ Ruta para cerrar sesión
router.delete("/sessions", auth.checkSession, sessionsController.destroy);

// Ruta de prueba para verificar que las rutas funcionan
router.get("/test", (req, res) => {
  res.send("¡Rutas funcionando!");
});

module.exports = router;
