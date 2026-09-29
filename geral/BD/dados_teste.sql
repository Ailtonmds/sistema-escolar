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
    (nome, email, telefone, usuario, senha, turma_id, perfil)
VALUES
    (
        'Administrador',
        'admin@escola.com',
        '(11) 99999-0000',
        'admin',
        'admin123',
        NULL,
        'admin'
    ),
    (
        'Carlos Mendes',
        'carlos.mendes@escola.com',
        '(11) 99999-0001',
        'carlos',
        '123456',
        1,
        'professor'
    ),
    (
        'Ana Oliveira',
        'ana.oliveira@escola.com',
        '(11) 99999-0002',
        'ana',
        '123456',
        2,
        'professor'
    ),
    (
        'Ricardo Souza',
        'ricardo.souza@escola.com',
        '(11) 99999-0003',
        'ricardo',
        '123456',
        NULL,
        'professor'
    );


-- ============================================================
-- VÍNCULO PROFESSOR x DISCIPLINA
-- ============================================================

INSERT INTO professor_disciplinas
    (professor_id, disciplina_id)
VALUES
    (2, 4),
    (2, 5),
    (3, 1),
    (3, 3),
    (4, 2),
    (4, 6);


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
    p.perfil,
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
    p.perfil,
    t.nome
ORDER BY p.nome;


-- ============================================================
-- FIM DO DATABASE.SQL
-- ============================================================