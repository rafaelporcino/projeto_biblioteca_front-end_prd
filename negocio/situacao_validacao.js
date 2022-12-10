function validarSituacao(situacao) {
    return situacao && situacao.nome && situacao.username && situacao.passord &&
            typeof situacao.id == 'integer' &&            
            typeof situacao.descricao == 'string' 
}

module.exports = {
    validarSituacao
}