function validarLivro(livro) {
    return livro && livro.nome && livro.username && livro.passord &&
            typeof livro.nome == 'string' &&
            typeof livro.username == 'string' &&
            typeof livro.passord == 'string' 
}

module.exports = {
    validarlivro
}