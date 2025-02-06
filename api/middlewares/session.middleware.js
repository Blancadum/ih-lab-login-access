const Session = require("../models/session.model");
const createError = require("http-errors");

module.exports.checkSession = async (req, res, next) => {
  try {
    // 1. Obtener el session_id desde la cookie
    const sessionId = req.cookies.session_id;

    if (!sessionId) {
      return next(createError(401, "Falta la sesión en la cookie"));
    }

    // 2. Buscar la sesión en la base de datos y poblar el campo `user`
    const session = await Session.findOne({ token: sessionId }).populate("user");

    if (!session) {
      return next(createError(401, "Sesión inválida o expirada"));
    }

    // 3. Actualizar el último acceso de la sesión
    session.lastAccess = new Date();

    // 4. Guardar los cambios en la sesión
    await session.save();

    // 5. Dejar los datos de sesión y usuario en `req`
    req.session = session;
    req.user = session.user;

    // 6. Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    next(error);
  }
};
