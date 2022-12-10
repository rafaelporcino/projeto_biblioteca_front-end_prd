const {validarEmprestimo} = require('./emprestimo_validacao')
const emprestimoPersistence = require('../persistence/emprestimo_persistence')


async function inserir(emprestimo) {
    if(emprestimo && emprestimo.id_usuario && emprestimo.id_livro && emprestimo.id_situacao && emprestimo.dt_retirada && emprestimo.dt_devolucao_prevista){
        const emprestimoInserido = await emprestimoPersistence.inserir(emprestimo);
        return emprestimoInserido;
    }
    else {
        throw { id: 400, mensagem: "Falta parametros"};
    }
}

async function listar() {
    return await emprestimoPersistence.listar();
}

async function buscarPorId(id) {
    const emprestimo = await emprestimoPersistence.buscarPorId(id);
    if(!emprestimo) {
        throw { id: 404, mensagem: `emprestimo ${id} nao encontrado`};
    }
    return emprestimo;
}

async function buscarPorNome(nome) {
    if(!nome) {
        throw { id: 400, mensagem: "Falta parametro nome"};
    }
    return await emprestimoPersistence.buscarPorNome(nome);
}

async function atualizar(id, emprestimo) {
    if(validarEmprestimo(emprestimo)) {
        const emprestimoAtualizar = await buscarPorId(id);
        if(emprestimoAtualizar)
            return await emprestimoPersistence.atualizar(id, emprestimo);

    }
    else {
        throw { id: 400, mensagem: "Parametros Invalidos"};
    }
}

async function deletar(id) {
    const emprestimoDeletar = await buscarPorId(id);
    if(emprestimoDeletar)
        return await emprestimoPersistence.deletar(id);
}

module.exports = {
    inserir, 
    listar, 
    buscarPorId, 
    buscarPorNome, 
    atualizar, 
    deletar
}