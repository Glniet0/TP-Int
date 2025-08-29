CREATE DATABASE IF NOT EXISTS agromaquinas;
USE agromaquinas;

CREATE TABLE maquinaria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  marca VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL
);

INSERT INTO maquinaria (nombre, marca, precio) VALUES
("Tractor Serie 7R", "John Deere", 250000),
("Cosechadora S700", "John Deere", 350000),
("Pulverizadora PLA", "PLA", 150000);
