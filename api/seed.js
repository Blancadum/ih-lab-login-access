const mongoose = require("mongoose");
const User = require("./models/user");
const fs = require("fs");
require("dotenv").config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => {
    console.error("❌ Error de conexión:", err);
    process.exit(1);
  });

// Leer archivo de datos de usuarios
const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

// Insertar usuarios en la base de datos
async function seedDatabase() {
  try {
    await User.deleteMany(); // Limpia la colección antes de insertar
    await User.insertMany(users);
    
    console.log("✅ Usuarios insertados correctamente");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error al insertar usuarios:", error);
    mongoose.connection.close();
  }
}

seedDatabase();