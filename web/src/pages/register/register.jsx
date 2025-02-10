import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (email, password) => {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } else {
      alert("Error en el registro. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <RegisterForm onSubmit={handleRegister} /> {/* Se usa el componente */}
      <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
    </div>
  );
}

export default Register;
