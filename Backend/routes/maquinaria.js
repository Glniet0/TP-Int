const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Listar
  router.get("/", (req, res) => {
    db.query("SELECT * FROM maquinaria", (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  // Crear
  router.post("/", (req, res) => {
    const { nombre, marca, precio } = req.body;
    db.query(
      "INSERT INTO maquinaria (nombre, marca, precio) VALUES (?, ?, ?)",
      [nombre, marca, precio],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, nombre, marca, precio });
      }
    );
  });

  // Actualizar (PUT)
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, marca, precio } = req.body;
    db.query(
      "UPDATE maquinaria SET nombre = ?, marca = ?, precio = ? WHERE id = ?",
      [nombre, marca, precio, id],
      (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id, nombre, marca, precio });
      }
    );
  });

  // Eliminar
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM maquinaria WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
    });
  });

  return router;
};
