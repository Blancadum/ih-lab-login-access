import { useNavigate } from "react-router-dom";

function Home({ user, logout }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div>
        <p>No has iniciado sesión</p>
        <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Bienvenido, {user.email}</h1>
      <button onClick={logout}>Cerrar Sesión</button>
      </div>
  );
}

export default Home;