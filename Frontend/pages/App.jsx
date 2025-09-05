import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";  // Importá el navbar
import Maquinaria from "./Maquinaria.jsx";
import Admin from "./Admin.jsx";

function Home() {
  return (
    <div className="page">
      <h2>Bienvenido a Agromáquinas</h2>
      <img
        src="/tractor.jpg"
        alt="Tractor"
        style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "20px" }}
      />
      <p>Soluciones en maquinaria agrícola al alcance de tu mano 🚜</p>
    </div>
  );
}

function Contacto() {
  return (
    <div className="page">
      <h2>Contacto</h2>
      <form className="form-contacto"> {/* Aquí está el bonus */}
        <input type="text" placeholder="Nombre" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Mensaje" rows="5" required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar /> {/* Usamos el Navbar componente */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/maquinaria" element={<Maquinaria />} />
      </Routes>
    </>
  );
}

export default App;
