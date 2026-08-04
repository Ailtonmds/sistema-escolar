import Aluno from '../models/Aluno.js'


async function listarAlunos(req, res) {
    try {
        const alunos = await Aluno.findAll();
        res.status(200).json(alunos);
    } catch (erro) {
        res.status(500).send("Erro ao listar alunos: " + erro.message);
    }
}


async function cadastrarAluno(req, res) {
    try {
        const novoAluno = await Aluno.create(req.body);
        res.status(201).json(novoAluno);
        console.log("Aluno salvo no banco:", novoAluno.nome);
    } catch (erro) {
        res.status(400).send("Erro ao salvar: " + erro.message);
    }
}

export default { cadastrarAluno, listarAlunos };