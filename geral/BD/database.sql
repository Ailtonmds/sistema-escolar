-- ============================================================
-- SISTEMA ESCOLAR
-- DATABASE.SQL
-- ============================================================

-- Criar banco
CREATE DATABASE IF NOT EXISTS sistema_escolar
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE sistema_escolar;


-- ============================================================
-- LIMPEZA DAS TABELAS
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS professor_disciplinas;
DROP TABLE IF EXISTS frequencias;
DROP TABLE IF EXISTS chamadas;
DROP TABLE IF EXISTS notas;
DROP TABLE IF EXISTS aluno_disciplinas;
DROP TABLE IF EXISTS disciplinas;
DROP TABLE IF EXISTS alunos;
DROP TABLE IF EXISTS professores;
DROP TABLE IF EXISTS turmas;

SET FOREIGN_KEY_CHECKS = 1;


-- ============================================================
-- TABELA: TURMAS
-- ============================================================

CREATE TABLE turmas (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    serie VARCHAR(50) NOT NULL,
    ano INT NOT NULL,

    PRIMARY KEY (id),

    UNIQUE KEY uk_turma_nome_ano (nome, ano)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABELA: ALUNOS
-- ============================================================

CREATE TABLE alunos (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) DEFAULT NULL,
    data_nascimento DATE DEFAULT NULL,
    serie VARCHAR(50) DEFAULT NULL,
    cpf VARCHAR(14) DEFAULT NULL,
    telefone VARCHAR(20) DEFAULT NULL,
    endereco VARCHAR(255) DEFAULT NULL,
    turma_id INT DEFAULT NULL,

    PRIMARY KEY (id),

    UNIQUE KEY uk_aluno_cpf (cpf),

    KEY idx_alunos_turma (turma_id),

    CONSTRAINT fk_alunos_turma
        FOREIGN KEY (turma_id)
        REFERENCES turmas(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABELA: PROFESSORES
-- ============================================================

CREATE TABLE professores (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) DEFAULT NULL,
    telefone VARCHAR(20) DEFAULT NULL,
    usuario VARCHAR(50) DEFAULT NULL,
    senha VARCHAR(100) DEFAULT NULL,
    turma_id INT DEFAULT NULL,
    perfil ENUM('professor','admin','aluno') NOT NULL DEFAULT 'professor',

    PRIMARY KEY (id),

    UNIQUE KEY uk_professor_email (email),
    UNIQUE KEY uk_professor_usuario (usuario),

    KEY idx_professores_turma (turma_id),

    CONSTRAINT fk_professores_turma
        FOREIGN KEY (turma_id)
        REFERENCES turmas(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABELA: DISCIPLINAS
-- ============================================================

CREATE TABLE disciplinas (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) DEFAULT NULL,

    PRIMARY KEY (id),

    UNIQUE KEY uk_disciplina_nome (nome)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABELA: PROFESSOR_DISCIPLINAS
--
-- Relacionamento N:N entre professores e disciplinas
-- ============================================================

CREATE TABLE professor_disciplinas (
    id INT NOT NULL AUTO_INCREMENT,
    professor_id INT NOT NULL,
    disciplina_id INT NOT NULL,

    PRIMARY KEY (id),

    UNIQUE KEY uk_professor_disciplina (
        professor_id,
        disciplina_id
    ),

    KEY idx_professor_disciplinas_professor (professor_id),
    KEY idx_professor_disciplinas_disciplina (disciplina_id),

    CONSTRAINT fk_professor_disciplinas_professor
        FOREIGN KEY (professor_id)
        REFERENCES professores(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_professor_disciplinas_disciplina
        FOREIGN KEY (disciplina_id)
        REFERENCES disciplinas(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABELA: ALUNO_DISCIPLINAS
--
-- Relacionamento N:N entre alunos e disciplinas
-- ============================================================

CREATE TABLE aluno_disciplinas (
    id INT NOT NULL AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,

    PRIMARY KEY (id),

    UNIQUE KEY uk_aluno_disciplina (
        aluno_id,
        disciplina_id
    ),

    KEY idx_aluno_disciplinas_aluno (aluno_id),
    KEY idx_aluno_disciplinas_disciplina (disciplina_id),

    CONSTRAINT fk_aluno_disciplinas_aluno
        FOREIGN KEY (aluno_id)
        REFERENCES alunos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_aluno_disciplinas_disciplina
        FOREIGN KEY (disciplina_id)
        REFERENCES disciplinas(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABELA: NOTAS
-- ============================================================

CREATE TABLE notas (
    id INT NOT NULL AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    bimestre INT NOT NULL,
    nota DECIMAL(5,2) NOT NULL,

    PRIMARY KEY (id),

    UNIQUE KEY uk_nota_aluno_disciplina_bimestre (
        aluno_id,
        disciplina_id,
        bimestre
    ),

    KEY idx_notas_aluno (aluno_id),
    KEY idx_notas_disciplina (disciplina_id),

    CONSTRAINT fk_notas_aluno
        FOREIGN KEY (aluno_id)
        REFERENCES alunos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_notas_disciplina
        FOREIGN KEY (disciplina_id)
        REFERENCES disciplinas(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_bimestre
        CHECK (bimestre BETWEEN 1 AND 4),

    CONSTRAINT chk_nota
        CHECK (nota BETWEEN 0 AND 10)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABELA: CHAMADAS
--
-- Cabeçalho da chamada lançada pelo professor logado
-- (turma, disciplina, data, plano de aula e quantidade de aulas)
-- ============================================================

CREATE TABLE chamadas (
    id INT NOT NULL AUTO_INCREMENT,
    professor_id INT NOT NULL,
    turma_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    data_aula DATE NOT NULL,
    quantidade_aulas INT NOT NULL DEFAULT 1,
    titulo_plano VARCHAR(255) DEFAULT NULL,

    PRIMARY KEY (id),

    KEY idx_chamadas_professor (professor_id),
    KEY idx_chamadas_turma (turma_id),
    KEY idx_chamadas_disciplina (disciplina_id),

    CONSTRAINT fk_chamadas_professor
        FOREIGN KEY (professor_id)
        REFERENCES professores(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_chamadas_turma
        FOREIGN KEY (turma_id)
        REFERENCES turmas(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_chamadas_disciplina
        FOREIGN KEY (disciplina_id)
        REFERENCES disciplinas(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABELA: FREQUENCIAS
--
-- Registra a falta POR AULA (numero_aula) dentro de uma chamada
-- ============================================================

CREATE TABLE frequencias (
    id INT NOT NULL AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    chamada_id INT DEFAULT NULL,
    numero_aula INT DEFAULT NULL,
    data_aula DATE NOT NULL,
    presente BOOLEAN NOT NULL DEFAULT FALSE,

    PRIMARY KEY (id),

    UNIQUE KEY uk_frequencia_chamada_aula (
        chamada_id,
        aluno_id,
        numero_aula
    ),

    KEY idx_frequencias_aluno (aluno_id),
    KEY idx_frequencias_data (data_aula),

    CONSTRAINT fk_frequencias_aluno
        FOREIGN KEY (aluno_id)
        REFERENCES alunos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_frequencias_chamada
        FOREIGN KEY (chamada_id)
        REFERENCES chamadas(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABELA: AUDITORIA
--
-- Missão 007 - Registra operações importantes do sistema
-- (login, notas e frequências). Somente o perfil admin consulta.
-- ============================================================

DROP TABLE IF EXISTS auditoria;

CREATE TABLE auditoria (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT DEFAULT NULL,
    usuario_nome VARCHAR(150) DEFAULT NULL,
    perfil VARCHAR(20) DEFAULT NULL,
    operacao VARCHAR(50) NOT NULL,
    recurso VARCHAR(50) NOT NULL,
    recurso_id INT DEFAULT NULL,
    detalhes TEXT DEFAULT NULL,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    KEY idx_auditoria_criado_em (criado_em),
    KEY idx_auditoria_operacao (operacao),
    KEY idx_auditoria_recurso (recurso),
    KEY idx_auditoria_usuario (usuario_id),
    KEY idx_auditoria_perfil (perfil)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
