require("dotenv").config(); // Carga las variables de entorno desde el archivo .env
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

// Importar el modelo de usuario
const User = require("./models/user");

// Conectar a MongoDB usando la variable de entorno
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Atlas conectado"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// Habilitar CORS para permitir peticiones desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Asegúrate de que es la URL de tu frontend
    credentials: true, // Permite que el navegador envíe cookies
  })
);

// Middlewares para procesar JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Obtener todos los usuarios desde MongoDB
app.get("/api/data/users", async (req, res) => {
  try {
    const users = await User.find(); // Busca todos los usuarios en MongoDB
    res.json(users);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios", details: error.message });
  }
});

//Agregar un nuevo usuario a MongoDB
app.post("/api/data/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Nombre y email son obligatorios" });
    }

    const newUser = new User({ name, email });
    await newUser.save();

    res.json({ message: "✅ Usuario agregado con éxito", user: newUser });
  } catch (error) {
    console.error("❌ Error al agregar usuario:", error);
    res.status(500).json({ error: "Error al agregar usuario", details: error.message });
  }
});

// Importar rutas de autenticación
const authRoutes = require("./routes/auth.routes");
app.use("/api/v1", authRoutes); // Prefijo para las rutas de autenticación

// Ruta de prueba para verificar que el backend funciona
app.get("/", (req, res) => {
  res.send("🚀¡Yuhu! ¡Servidor funcionando correctamente!🚀");
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
