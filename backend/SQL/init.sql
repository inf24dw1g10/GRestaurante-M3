-- Cria o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS Customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Mesas
CREATE TABLE IF NOT EXISTS Tables (
  id INT PRIMARY KEY AUTO_INCREMENT,
  number INT NOT NULL UNIQUE,
  capacity INT NOT NULL,
  status ENUM('available', 'reserved', 'occupied') DEFAULT 'available',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Pratos
CREATE TABLE IF NOT EXISTS Dishes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category ENUM('starter', 'main', 'dessert', 'beverage') NOT NULL,
  isAvailable BOOLEAN DEFAULT true,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Reservas
CREATE TABLE IF NOT EXISTS Reservations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customerId INT NOT NULL,
  tableId INT NOT NULL,
  date DATETIME NOT NULL,
  numberOfGuests INT NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customerId) REFERENCES Customers(id),
  FOREIGN KEY (tableId) REFERENCES Tables(id)
);

-- Tabela de junção entre Reservas e Pratos
CREATE TABLE IF NOT EXISTS ReservationDishes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  reservationId INT NOT NULL,
  dishId INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  notes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (reservationId) REFERENCES Reservations(id),
  FOREIGN KEY (dishId) REFERENCES Dishes(id)
);

-- Inserir dados de exemplo para Clientes
INSERT INTO Customers (name, email, phone) VALUES
('João Silva', 'joao@email.com', '912345678'),
('Maria Santos', 'maria@email.com', '923456789'),
('Pedro Costa', 'pedro@email.com', '934567890');

-- Inserir dados de exemplo para Mesas
INSERT INTO Tables (number, capacity, status) VALUES
(1, 4, 'available'),
(2, 2, 'available'),
(3, 6, 'available'),
(4, 4, 'available'),
(5, 8, 'available');

-- Inserir dados de exemplo para Pratos
INSERT INTO Dishes (name, description, price, category, isAvailable) VALUES
('Bacalhau à Brás', 'Prato tradicional português', 15.99, 'main', true),
('Sopa do Dia', 'Sopa caseira', 3.50, 'starter', true),
('Pudim', 'Pudim caseiro', 4.00, 'dessert', true),
('Vinho Tinto', 'Vinho da casa', 12.00, 'beverage', true),
('Francesinha', 'Especialidade da casa', 14.99, 'main', true);