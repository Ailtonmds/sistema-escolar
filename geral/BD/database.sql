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
-- DADOS INICIAIS
-- ============================================================

INSERT INTO turmas
    (nome, serie, ano)
VALUES
    ('1º DS A', '1º Ano', 2026),
    ('2º DS A', '2º Ano', 2026),
    ('3º DS A', '3º Ano', 2026);


INSERT INTO disciplinas
    (nome, descricao)
VALUES
    ('Português', 'Língua Portuguesa'),
    ('Matemática', 'Matemática'),
    ('Inglês', 'Língua Inglesa'),
    ('Programação', 'Desenvolvimento de Sistemas'),
    ('Banco de Dados', 'Banco de Dados'),
    ('Desenvolvimento Web', 'Desenvolvimento Web');


-- ============================================================
-- ALUNOS DE EXEMPLO
-- ============================================================

INSERT INTO alunos
    (nome, email, data_nascimento, serie, cpf, telefone, endereco, turma_id)
VALUES
    (
        'João da Silva',
        'joao@email.com',
        '2009-05-10',
        '1º Ano',
        NULL,
        NULL,
        NULL,
        1
    ),
    (
        'Maria Santos',
        'maria@email.com',
        '2009-08-15',
        '1º Ano',
        NULL,
        NULL,
        NULL,
        1
    );


-- ============================================================
-- VÍNCULO ALUNO x DISCIPLINA
-- ============================================================

INSERT INTO aluno_disciplinas
    (aluno_id, disciplina_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 4),
    (1, 5),
    (2, 1),
    (2, 2),
    (2, 4),
    (2, 5);


-- ============================================================
-- PROFESSORES DE EXEMPLO
-- ============================================================

INSERT INTO professores
    (nome, email, telefone, usuario, senha, turma_id)
VALUES
    (
        'Carlos Mendes',
        'carlos.mendes@escola.com',
        '(11) 99999-0001',
        'carlos',
        '123456',
        1
    ),
    (
        'Ana Oliveira',
        'ana.oliveira@escola.com',
        '(11) 99999-0002',
        'ana',
        '123456',
        2
    ),
    (
        'Ricardo Souza',
        'ricardo.souza@escola.com',
        '(11) 99999-0003',
        'ricardo',
        '123456',
        NULL
    );


-- ============================================================
-- VÍNCULO PROFESSOR x DISCIPLINA
-- ============================================================

INSERT INTO professor_disciplinas
    (professor_id, disciplina_id)
VALUES
    (1, 4),
    (1, 5),
    (2, 1),
    (2, 3),
    (3, 2),
    (3, 6);


-- ============================================================
-- NOTAS DE EXEMPLO
-- ============================================================

INSERT INTO notas
    (aluno_id, disciplina_id, bimestre, nota)
VALUES
    (1, 1, 1, 8.50),
    (1, 2, 1, 7.00),
    (1, 4, 1, 9.00),
    (1, 5, 1, 8.00),
    (2, 1, 1, 9.00),
    (2, 2, 1, 8.50);


-- ============================================================
-- FREQUÊNCIAS DE EXEMPLO
-- ============================================================

INSERT INTO frequencias
    (aluno_id, chamada_id, numero_aula, data_aula, presente)
VALUES
    (1, NULL, 1, '2026-08-26', TRUE),
    (1, NULL, 1, '2026-08-27', TRUE),
    (1, NULL, 1, '2026-08-28', FALSE),
    (2, NULL, 1, '2026-08-26', TRUE),
    (2, NULL, 1, '2026-08-27', FALSE),
    (2, NULL, 1, '2026-08-28', TRUE);


-- ============================================================
-- CONSULTAS ÚTEIS
-- ============================================================


-- ------------------------------------------------------------
-- LISTAR ALUNOS COM SUAS TURMAS
-- ------------------------------------------------------------

SELECT
    a.id,
    a.nome,
    a.email,
    t.nome AS turma,
    t.serie,
    t.ano
FROM alunos a
LEFT JOIN turmas t
    ON t.id = a.turma_id
ORDER BY a.nome;


-- ------------------------------------------------------------
-- LISTAR FREQUÊNCIAS
-- ------------------------------------------------------------

SELECT
    f.id,
    a.nome AS aluno,
    f.data_aula,
    CASE
        WHEN f.presente = TRUE THEN 'Presente'
        ELSE 'Falta'
    END AS situacao
FROM frequencias f
INNER JOIN alunos a
    ON a.id = f.aluno_id
ORDER BY f.data_aula DESC, a.nome;


-- ------------------------------------------------------------
-- CONTAR PRESENÇAS
-- ------------------------------------------------------------

SELECT
    COUNT(*) AS total_presencas
FROM frequencias
WHERE presente = TRUE;


-- ------------------------------------------------------------
-- CONTAR FALTAS
-- ------------------------------------------------------------

SELECT
    COUNT(*) AS total_faltas
FROM frequencias
WHERE presente = FALSE;


-- ------------------------------------------------------------
-- TOTAL DE FREQUÊNCIAS POR ALUNO
-- ------------------------------------------------------------

SELECT
    a.id,
    a.nome,

    COUNT(f.id) AS total_aulas,

    SUM(
        CASE
            WHEN f.presente = TRUE THEN 1
            ELSE 0
        END
    ) AS presencas,

    SUM(
        CASE
            WHEN f.presente = FALSE THEN 1
            ELSE 0
        END
    ) AS faltas

FROM alunos a

LEFT JOIN frequencias f
    ON f.aluno_id = a.id

GROUP BY
    a.id,
    a.nome

ORDER BY a.nome;


-- ------------------------------------------------------------
-- PERCENTUAL DE FREQUÊNCIA POR ALUNO
-- ------------------------------------------------------------

SELECT
    a.id,
    a.nome,

    COUNT(f.id) AS total_aulas,

    SUM(
        CASE
            WHEN f.presente = TRUE THEN 1
            ELSE 0
        END
    ) AS presencas,

    SUM(
        CASE
            WHEN f.presente = FALSE THEN 1
            ELSE 0
        END
    ) AS faltas,

    ROUND(
        (
            SUM(
                CASE
                    WHEN f.presente = TRUE THEN 1
                    ELSE 0
                END
            ) / NULLIF(COUNT(f.id), 0)
        ) * 100,
        2
    ) AS percentual_frequencia

FROM alunos a

LEFT JOIN frequencias f
    ON f.aluno_id = a.id

GROUP BY
    a.id,
    a.nome

ORDER BY a.nome;


-- ------------------------------------------------------------
-- NOTAS DOS ALUNOS
-- ------------------------------------------------------------

SELECT
    a.nome AS aluno,
    d.nome AS disciplina,
    n.bimestre,
    n.nota
FROM notas n

INNER JOIN alunos a
    ON a.id = n.aluno_id

INNER JOIN disciplinas d
    ON d.id = n.disciplina_id

ORDER BY
    a.nome,
    d.nome,
    n.bimestre;


-- ------------------------------------------------------------
-- LISTAR PROFESSORES COM SUAS DISCIPLINAS E TURMA
-- ------------------------------------------------------------

SELECT
    p.id,
    p.nome,
    p.email,
    t.nome AS turma,
    GROUP_CONCAT(d.nome ORDER BY d.nome SEPARATOR ', ') AS disciplinas
FROM professores p
LEFT JOIN turmas t
    ON t.id = p.turma_id
LEFT JOIN professor_disciplinas pd
    ON pd.professor_id = p.id
LEFT JOIN disciplinas d
    ON d.id = pd.disciplina_id
GROUP BY
    p.id,
    p.nome,
    p.email,
    t.nome
ORDER BY p.nome;


-- ============================================================
-- FIM DO DATABASE.SQL
-- ============================================================