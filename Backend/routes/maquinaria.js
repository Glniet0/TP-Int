const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // READ - listar maquinaria
  router.get("/", (req, res) => {
    db.query("SELECT * FROM maquinaria", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // CREATE - agregar maquinaria
  router.post("/", (req, res) => {
    const { nombre, marca, precio } = req.body;
    db.query("INSERT INTO maquinaria (nombre, marca, precio) VALUES (?, ?, ?)",
      [nombre, marca, precio],
      (err, result) => {
        if (err) throw err;
        res.json({ message: "Máquina agregada ✅" });
      }
    );
  });

  // UPDATE - modificar maquinaria
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, marca, precio } = req.body;
    db.query("UPDATE maquinaria SET nombre=?, marca=?, precio=? WHERE id=?",
      [nombre, marca, precio, id],
      (err) => {
        if (err) throw err;
        res.json({ message: "Máquina actualizada ✅" });
      }
    );
  });

  // DELETE - eliminar maquinaria
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM maquinaria WHERE id=?", [id], (err) => {
      if (err) throw err;
      res.json({ message: "Máquina eliminada 🗑️" });
    });
  });

  return router;
};
