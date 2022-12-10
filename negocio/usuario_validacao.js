function validarUsuario(usuario) {
    return usuario && usuario.nome && usuario.username && usuario.passord &&
            typeof usuario.nome == 'string' &&
            typeof usuario.username == 'string' &&
            typeof usuario.passord == 'string' 
}

module.exports = {
    validarUsuario
}