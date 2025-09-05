const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const mysql = require("mysql2");
const cors = require("cors"); 

const app = express();
const PORT = 4000;

// Configuración de Handlebars 
app.engine("hbs", exphbs.engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(cors()); // <--- habilita acceso desde React (Frontend en 5173)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "010483021102", // 
  database: "agromaquinas"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Conectado a MySQL");
});

// Rutas de maquinaria
const maquinariaRoutes = require("./routes/maquinaria")(db);
app.use("/api/maquinaria", maquinariaRoutes);

// Vistas renderizadas con HBS 
app.get("/contacto", (req, res) => res.render("contacto"));
app.get("/admin", (req, res) => {
  db.query("SELECT * FROM maquinaria", (err, results) => {
    if (err) throw err;
    res.render("admin", { maquinaria: results });
  });
});

// Envío de mails (deshabilitado para que no rompa mientras pruebo)
app.post("/contacto", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

 

  res.send("📩 (Simulado) Mensaje enviado con éxito ✅");
});

// Servidor
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
