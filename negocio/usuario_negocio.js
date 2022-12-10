const {validarUsuario} = require('./usuario_validacao')
const usuarioPersistence = require('../persistence/usuario_persistence')


async function inserir(produto) {
    if(produto && produto.nome && produto.preco){
        const produtoInserido = await usuarioPersistence.inserir(produto);
        return produtoInserido;
    }
    else {
        throw { id: 400, mensagem: "Falta parametros"};
    }
}

async function listar() {
    return await usuarioPersistence.listar();
}

async function buscarPorId(id) {
    const produto = await usuarioPersistence.buscarPorId(id);
    if(!produto) {
        throw { id: 404, mensagem: `Usuário ${id} nao encontrado`};
    }
    return produto;
}

async function buscarPorNome(nome) {
    if(!nome) {
        throw { id: 400, mensagem: "Falta parametro nome"};
    }
    return await usuarioPersistence.buscarPorNome(nome);
}

async function atualizar(id, produto) {
    if(validarUsuario(produto)) {
        const produtoAtualizar = await buscarPorId(id);
        if(produtoAtualizar)
            return await usuarioPersistence.atualizar(id, produto);

    }
    else {
        throw { id: 400, mensagem: "Parametros Invalidos"};
    }
}

async function deletar(id) {
    const produtoDeletar = await buscarPorId(id);
    if(produtoDeletar)
        return await usuarioPersistence.deletar(id);
}

module.exports = {
    inserir, 
    listar, 
    buscarPorId, 
    buscarPorNome, 
    atualizar, 
    deletar
}