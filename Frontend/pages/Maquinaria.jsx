import React, { useEffect, useState } from "react";

function Maquinaria() {
  const [maquinas, setMaquinas] = useState([]);
  const [form, setForm] = useState({ nombre: "", marca: "", precio: "" });
  const [editId, setEditId] = useState(null);

  // Cargar lista desde el backend
  const cargarMaquinas = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/maquinaria");
      const data = await res.json();
      console.log("Maquinas cargadas: ", data); // Verificar los datos que llegan del backend
      setMaquinas(data);
    } catch (error) {
      console.error("Error al cargar las máquinas", error);
    }
  };

  useEffect(() => {
    cargarMaquinas();
  }, []); // Esto cargará las máquinas solo al inicio

  // Manejar inputs
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guardar (agregar o actualizar)
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let response;
      if (editId) {
        // UPDATE
        response = await fetch(`http://localhost:4000/api/maquinaria/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        console.log("Respuesta de actualización: ", response);
      } else {
        // CREATE
        response = await fetch("http://localhost:4000/api/maquinaria", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        console.log("Respuesta de creación: ", response);
      }

      // Verificar si la respuesta fue correcta
      if (response.ok) {
        setForm({ nombre: "", marca: "", precio: "" });
        setEditId(null);
        cargarMaquinas(); // Recargar la lista después de agregar o actualizar
      } else {
        console.error("Error al agregar o actualizar la maquinaria");
      }
    } catch (error) {
      console.error("Error al guardar la maquinaria", error);
    }
  };

  // Eliminar
  const handleDelete = async id => {
    try {
      await fetch(`http://localhost:4000/api/maquinaria/${id}`, {
        method: "DELETE"
      });
      cargarMaquinas(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar la maquinaria", error);
    }
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
