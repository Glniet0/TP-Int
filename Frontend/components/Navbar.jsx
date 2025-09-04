import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">AgroMáquinas</Link>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/maquinaria">Maquinaria</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
