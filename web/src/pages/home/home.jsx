import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../../services/api-service";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    profile()
      .then(setUser)
      .catch(() => navigate("/login")); // Redirige a Login si no está autenticado
  }, []);

  return (
    <div>
      <h1>Bienvenido, {user ? user.email : "Cargando..."}</h1>
    </div>
  );
}