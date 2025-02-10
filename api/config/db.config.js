const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/lab-login-access";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.info(`✅ Conectado a la base de datos: ${MONGODB_URI}`))
  .catch((error) => {
    console.error(`❌ Error al conectar con la base de datos:`, error);
    process.exit(1); // Salir con código de error
  });

// Manejo de eventos para cerrar la conexión de forma segura
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("🔌 Conexión a la base de datos cerrada correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al cerrar la conexión de la base de datos", error);
    process.exit(1);
  }
});
