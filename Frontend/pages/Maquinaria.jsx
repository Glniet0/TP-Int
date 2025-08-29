import { useEffect, useState } from "react";

function Maquinaria() {
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/maquinaria")
      .then(res => res.json())
      .then(data => setMaquinas(data));
  }, []);

  return (
    <div>
      <h2>Maquinaria Disponible</h2>
      <ul>
        {maquinas.map(m => (
          <li key={m.id}>
            {m.nombre} - {m.marca} - ${m.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Maquinaria;
