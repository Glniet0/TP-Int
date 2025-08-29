import { useEffect, useState } from "react";

function Admin() {
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/maquinaria")
      .then(res => res.json())
      .then(data => setMaquinas(data));
  }, []);

  return (
    <div>
      <h2>Panel de Administración</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {maquinas.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nombre}</td>
              <td>{m.marca}</td>
              <td>${m.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
