import React from "react";
import { useEffect, useState } from "react";

function Maquinaria() {
  const [maquinas, setMaquinas] = useState([]);
  const [form, setForm] = useState({ nombre: "", marca: "", precio: "" });
  const [editId, setEditId] = useState(null);

  // Cargar lista desde el backend
  const cargarMaquinas = () => {
    fetch("http://localhost:4000/api/maquinaria")
      .then(res => res.json())
      .then(data => setMaquinas(data));
  };

  useEffect(() => {
    cargarMaquinas();
  }, []);

  // Manejar inputs
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guardar (agregar o actualizar)
  const handleSubmit = e => {
    e.preventDefault();

    if (editId) {
      // UPDATE
      fetch(`http://localhost:4000/api/maquinaria/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }).then(() => {
        setForm({ nombre: "", marca: "", precio: "" });
        setEditId(null);
        cargarMaquinas();
      });
    } else {
      // CREATE
      fetch("http://localhost:4000/api/maquinaria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }).then(() => {
        setForm({ nombre: "", marca: "", precio: "" });
        cargarMaquinas();
      });
    }
  };

  // Eliminar
  const handleDelete = id => {
    fetch(`http://localhost:4000/api/maquinaria/${id}`, {
      method: "DELETE"
    }).then(() => cargarMaquinas());
  };

  // Editar (carga los datos en el form)
  const handleEdit = maquina => {
    setForm({
      nombre: maquina.nombre,
      marca: maquina.marca,
      precio: maquina.precio
    });
    setEditId(maquina.id);
  };

  return (
    <div className="page">
      <h2>Gestión de Maquinaria</h2>

      {/* Formulario */}
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="marca"
          placeholder="Marca"
          value={form.marca}
          onChange={handleChange}
          required
        />
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Tabla de maquinaria */}
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {maquinas.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nombre}</td>
              <td>{m.marca}</td>
              <td>${m.precio}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(m)}>
                  Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(m.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Maquinaria;
