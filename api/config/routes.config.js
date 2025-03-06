const express = require("express");
const router = express.Router();
const createError = require("http-errors");

// Importar controladores
const usersController = require("../controllers/users.controller");
const sessionsController = require("../controllers/sessions.controller");

// Importar middleware de autenticación
const auth = require("../middlewares/session.middleware");


// Nueva ruta para devolver el JSON de usuarios
router.get("/data/users", (req, res) => {
  const filePath = path.join(__dirname, "../data/users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo" });
    }
    res.json(JSON.parse(data));
  });
});
//Rutas de Usuarios
router.post("/users", usersController.create);  // Registro de usuario
router.get("/users/me", auth.checkSession, usersController.profile);  // Perfil protegido

//Rutas de Sesión
router.post("/sessions", sessionsController.create);  // Inicio de sesión
router.delete("/sessions", auth.checkSession, sessionsController.destroy);  // Cierre de sesión

//Middleware para manejar rutas no encontradas (404)
router.use((req, res, next) => {
  next(createError(404, "Ruta no encontrada"));
});

//Middleware Global para Manejo de Errores
router.use((error, req, res, next) => {
  console.error(`[ERROR] ${error.status || 500}: ${error.message}`);

  res.status(error.status || 500).json({
    message: error.message,
    errors: error.errors || undefined,
  });
});

module.exports = router;
