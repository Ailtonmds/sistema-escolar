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

async function atualizarAluno(req, res) {
    try {
        const { id } = req.body;
        const alunoExistente = await Aluno.findByPk(id);
        if (!alunoExistente) {
            return res.status(404).send("Aluno não encontrado");
        }
        const alunoAtualizado = await alunoExistente.update(req.body);
        res.status(200).json(alunoAtualizado);
    } catch (erro) {
        res.status(400).send("Erro ao atualizar aluno: " + erro.message);
    }
}

async function excluirAluno(req, res) {
    try {
        const { id } = req.body;
        const alunoExistente = await Aluno.findByPk(id);
        if (!alunoExistente) {
            return res.status(404).send("Aluno não encontrado");
        }
        await alunoExistente.destroy();
        res.status(200).send("Aluno excluído com sucesso");
    } catch (erro) {
        res.status(400).send("Erro ao excluir aluno: " + erro.message);
    }
}

export default { cadastrarAluno, listarAlunos, atualizarAluno, excluirAluno };