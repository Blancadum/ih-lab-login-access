import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const res = await fetch("http://localhost:3000/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (res.ok) {
      alert("Login exitoso");
      navigate("/");
    } else {
      alert("Error en el login. Revisa tus credenciales.");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <LoginForm onSubmit={handleLogin} /> {/* Se usa el componente */}
      <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
    </div>
  );
}

export default Login;
