require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

// 🔹 Conectar a MongoDB usando la variable de entorno
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Atlas conectado"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// 🔹 Habilitar CORS para permitir peticiones desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Asegúrate de que es la URL de tu frontend
    credentials: true, // Permite que el navegador envíe cookies
  })
);

// 🔹 Middlewares para procesar JSON y cookies
app.use(express.json());
app.use(cookieParser());

// 🔹 Importar rutas
const authRoutes = require("./routes/auth.routes");
app.use("/api/v1", authRoutes); // Prefijo para las rutas de autenticación

// 🔹 Ruta de prueba para verificar que el backend funciona
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// 🔹 Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
