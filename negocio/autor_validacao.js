function validarAutor(autor) {
    return autor && autor.nome && autor.username && autor.passord &&
            typeof autor.nome == 'string' &&
            typeof autor.username == 'string' &&
            typeof autor.passord == 'string' 
}

module.exports = {
    validarAutor
}