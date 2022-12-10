const {validarAutor} = require('./autor_validacao')
const autorPersistence = require('../persistence/autor_persistence')


async function inserir(autor) {
    if(autor && autor.nome && autor.preco){
        const autorInserido = await autorPersistence.inserir(autor);
        return autorInserido;
    }
    else {
        throw { id: 400, mensagem: "Falta parametros"};
    }
}

async function listar() {
    return await autorPersistence.listar();
}

async function buscarPorId(id) {
    const autor = await autorPersistence.buscarPorId(id);
    if(!autor) {
        throw { id: 404, mensagem: `autor ${id} nao encontrado`};
    }
    return autor;
}

async function buscarPorNome(nome) {
    if(!nome) {
        throw { id: 400, mensagem: "Falta parametro nome"};
    }
    return await autorPersistence.buscarPorNome(nome);
}

async function atualizar(id, autor) {
    if(validarEmprestimo(autor)) {
        const autorAtualizar = await buscarPorId(id);
        if(autorAtualizar)
            return await autorPersistence.atualizar(id, autor);

    }
    else {
        throw { id: 400, mensagem: "Parametros Invalidos"};
    }
}

async function deletar(id) {
    const autorDeletar = await buscarPorId(id);
    if(autorDeletar)
        return await autorPersistence.deletar(id);
}

module.exports = {
    inserir, 
    listar, 
    buscarPorId, 
    buscarPorNome, 
    atualizar, 
    deletar
}