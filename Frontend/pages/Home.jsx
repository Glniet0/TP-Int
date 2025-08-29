import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1>Bienvenido a AgroMáquinas</h1>
      <p>Soluciones agrícolas en maquinaria de primer nivel.</p>
      <img
        src="https://www.deere.com/assets/images/region-4/products/tractors/7r/7r-row-crop-tractor-large.jpg"
        alt="tractor"
        className="img"
      />
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/contacto")}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Contactanos
        </button>
        <button
          onClick={() => navigate("/maquinaria")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Ver Maquinaria
        </button>
      </div>
    </div>
  );
}

export default Home;
