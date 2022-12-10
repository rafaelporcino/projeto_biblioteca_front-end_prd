const {validarSituacao} = require('./situacao_validacao')
const situacaoPersistence = require('../persistence/situacao_persistence')


async function inserir(situacao) {
    if(situacao && situacao.nome && situacao.preco){
        const situacaoInserido = await situacaoPersistence.inserir(situacao);
        return situacaoInserido;
    }
    else {
        throw { id: 400, mensagem: "Falta parametros"};
    }
}

async function listar() {
    return await situacaoPersistence.listar();
}

async function buscarPorId(id) {
    const situacao = await situacaoPersistence.buscarPorId(id);
    if(!situacao) {
        throw { id: 404, mensagem: `situacao ${id} nao encontrado`};
    }
    return situacao;
}

async function buscarPorNome(nome) {
    if(!nome) {
        throw { id: 400, mensagem: "Falta parametro nome"};
    }
    return await situacaoPersistence.buscarPorNome(nome);
}

async function atualizar(id, situacao) {
    if(validarSituacao(situacao)) {
        const situacaoAtualizar = await buscarPorId(id);
        if(situacaoAtualizar)
            return await situacaoPersistence.atualizar(id, situacao);

    }
    else {
        throw { id: 400, mensagem: "Parametros Invalidos"};
    }
}

async function deletar(id) {
    const situacaoDeletar = await buscarPorId(id);
    if(situacaoDeletar)
        return await situacaoPersistence.deletar(id);
}

module.exports = {
    inserir, 
    listar, 
    buscarPorId, 
    buscarPorNome, 
    atualizar, 
    deletar
}