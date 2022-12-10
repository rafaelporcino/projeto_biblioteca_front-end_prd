const {validarlivro} = require('./livro_validacao')
const livroPersistence = require('../persistence/livro_persistence')


async function inserir(livro) {
    if(livro && livro.titulo ){
        const livroInserido = await livroPersistence.inserir(livro);
        return livroInserido;
    }
    else {
        throw { id: 400, mensagem: "Falta parametros"};
    }
}

async function listar() {
    return await livroPersistence.listar();
}

async function buscarPorId(id) {
    const livro = await livroPersistence.buscarPorId(id);
    if(!livro) {
        throw { id: 404, mensagem: `livro ${id} nao encontrado`};
    }
    return livro;
}

async function buscarPorNome(nome) {
    if(!nome) {
        throw { id: 400, mensagem: "Falta parametro nome"};
    }
    return await livroPersistence.buscarPorNome(nome);
}

async function atualizar(id, livro) {
    if(validarEmprestimo(livro)) {
        const livroAtualizar = await buscarPorId(id);
        if(livroAtualizar)
            return await livroPersistence.atualizar(id, livro);

    }
    else {
        throw { id: 400, mensagem: "Parametros Invalidos"};
    }
}

async function deletar(id) {
    const livroDeletar = await buscarPorId(id);
    if(livroDeletar)
        return await livroPersistence.deletar(id);
}

module.exports = {
    inserir, 
    listar, 
    buscarPorId, 
    buscarPorNome, 
    atualizar, 
    deletar
}