import React from "react";
import { useState } from "react";

function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:4000/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(form).toString()
    })
      .then(() => {
        alert("Mensaje enviado ✅");
        setForm({ nombre: "", email: "", mensaje: "" }); // limpia el form
      })
      .catch(() => alert("Error al enviar ❌"));
  };

  return (
    <div className="page">
      <h2>Contacto</h2>
      <form className="form-contacto" onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="mensaje"
          placeholder="Mensaje"
          value={form.mensaje}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;
