function validarEmprestimo(emprestimo) {
    return emprestimo && emprestimo.nome && emprestimo.preco &&
            typeof emprestimo.id == 'integer' && 
            typeof emprestimo.id_usuario == 'integer' && 
            typeof emprestimo.id_livro == 'integer'  
}

module.exports = {
    validarEmprestimo
}