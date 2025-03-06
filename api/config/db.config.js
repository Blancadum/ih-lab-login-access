const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/lab-login-access";

//Eliminar warnings de Mongoose
mongoose.set("strictQuery", false);

//Conectar a la base de datos SIN opciones obsoletas
mongoose
  .connect(MONGODB_URI)
  .then(() => console.info(`Conectado a la base de datos: ${MONGODB_URI}`))
  .catch((error) => {
    console.error(`Error al conectar con la base de datos:`, error);
    process.exit(1);
  });

// Manejo de eventos para reconexión
mongoose.connection.on("disconnected", () => {
  console.warn("Conexión con MongoDB perdida. Intentando reconectar...");
});

mongoose.connection.on("reconnected", () => {
  console.info("Reconectado a MongoDB");
});

//Cerrar la conexión de forma segura cuando la app se detenga
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Conexión a la base de datos cerrada correctamente");
    process.exit(0);
  } catch (error) {
    console.error("Error al cerrar la conexión de la base de datos", error);
    process.exit(1);
  }
});
