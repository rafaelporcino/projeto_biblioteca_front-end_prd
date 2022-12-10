//Main
let cadastroEmprestimos = require('./persistence/emprestimo_persistence')


let prod4 = { nome:"Emprestimo 4"}

cadastroEmprestimos.inserir(prod4)

let prod5 = {nome:"Emprestimo 5"}

cadastroEmprestimos.inserir(prod5)


console.log("Listar",cadastroEmprestimos.listar())

try {
    console.log("Buscar Por ID=2", cadastroEmprestimos.buscarPorId(2))
} catch(err) { 
    console.log("Erro", err);
} 
try {
    console.log("Buscar Por ID=4", cadastroEmprestimos.buscarPorId(4))
} catch(err) { 
    console.log("Erro", err);
} 
try {
    console.log("Buscar Por ID=6", cadastroEmprestimos.buscarPorId(6))
} catch(err) { 
    console.log("Erro", err);
} 

cadastroEmprestimos.atualizar(1, { preco: 11 })

console.log("Listar",cadastroEmprestimos.listar())


