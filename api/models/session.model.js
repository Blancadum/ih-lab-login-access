const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ Referencia al modelo de usuario
      required: true,
    },
    token: {
      type: String,
      required: true, //Guardamos el JWT generado en login
    },
    lastAccess: {
      type: Date,
      default: Date.now, // ✅ Se actualiza al hacer una nueva petición
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Borrar sesión automáticamente 1 hora después del último acceso
schema.index({ lastAccess: 1 }, { expireAfterSeconds: 3600 });

const Session = mongoose.model("Session", schema);

module.exports = Session;
