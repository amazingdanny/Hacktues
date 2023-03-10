CREATE DATABASE SecurityU;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    valid_to TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 3 DAY),
    FOREIGN KEY (user_id) REFERENCES users(id)

);
