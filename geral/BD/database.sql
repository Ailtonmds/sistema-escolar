-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS sistema_escolar;
USE sistema_escolar;

-- Tabela de Turmas
CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    serie VARCHAR(255) NOT NULL,
    ano INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Alunos
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    data_nascimento DATE,
    serie VARCHAR(255),
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(255),
    endereco TEXT,
    turma_id INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Relacionamento com a tabela de turmas
    CONSTRAINT fk_alunos_turmas
        FOREIGN KEY (turma_id) 
        REFERENCES turmas(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);