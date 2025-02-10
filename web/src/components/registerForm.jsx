import { useState } from "react";

function RegisterForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para la validación de la contraseña
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  // Expresión regular para validar la contraseña
  const validatePassword = (password) => {
    const newValidations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password)
    };
    setValidations(newValidations);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={handlePasswordChange}
        required
      />

      {/* Validación de la contraseña */}
      <div>
        <p style={{ color: validations.length ? "green" : "red" }}>
          {validations.length ? "✔" : "✖"} Mínimo 8 caracteres
        </p>
        <p style={{ color: validations.uppercase ? "green" : "red" }}>
          {validations.uppercase ? "✔" : "✖"} Al menos 1 letra mayúscula
        </p>
        <p style={{ color: validations.lowercase ? "green" : "red" }}>
          {validations.lowercase ? "✔" : "✖"} Al menos 1 letra minúscula
        </p>
        <p style={{ color: validations.number ? "green" : "red" }}>
          {validations.number ? "✔" : "✖"} Al menos 1 número
        </p>
        <p style={{ color: validations.specialChar ? "green" : "red" }}>
          {validations.specialChar ? "✔" : "✖"} Al menos 1 carácter especial (@, $, !, %, etc.)
        </p>
      </div>

      <button type="submit" disabled={!Object.values(validations).every(Boolean)}>
        Registrarse
      </button>
    </form>
  );
}

export default RegisterForm;
