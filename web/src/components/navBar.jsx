import { Link } from "react-router-dom";

function Navbar({ user, logout }) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registro</Link></li>
          </>
        ) : (
          <li><button onClick={logout}>Cerrar Sesión</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
