import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Asegúrate de que los estilos globales están cargados
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
