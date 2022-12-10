const cadastro = require("./persistence/emprestimo_persistence")

//Cenario de Sucesso!
test ('Buscar Por Id 2 deve retornar Emprestimo 2',
    function() {
        let Emprestimo2 = {
            id:2, 
            nome:"Emprestimo 2"
        };

        expect(cadastro.buscarPorId(2))
            .toEqual(Emprestimo2);
    }
)

//Cenario de Insucesso - Não existe Emprestimo 6!
test ('Buscar Por Id 6 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.buscarPorId(6))
            .toThrow(errIdNaoEncontrado);
    }
)

test ('Inserir Emprestimo 4 deve ser inserido na lista com id 4 gerado',
    function() {
        const EmprestimoInserir = {nome:"Emprestimo 4"};
        cadastro.inserir(EmprestimoInserir);
        expect(cadastro.listar())
            .toEqual(listaInseridoEsperado);
    })

//Cenário de Sucesso
test ('Alterar Emprestimo com id 1 para nome "Emprestimo X"  deve atualizar na lista',
    function() {
        const EmprestimoAtualizadoEsperado = {id:1, nome:"Emprestimo X"};
        const EmprestimoAtualizar = {nome:"Emprestimo X"};
        const idAtualizar = 1;

        cadastro.atualizar(idAtualizar, EmprestimoAtualizar);

        expect(cadastro.buscarPorId(1))
            .toEqual(EmprestimoAtualizadoEsperado);

        expect(cadastro.listar())
            .toEqual(listaAtualizadoEsperado);

    }
)

//Cenario de Insucesso - Não existe Emprestimo 6!
test ('Atualizar o Emprestimo com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const EmprestimoAtualizar = {
            nome:"Emprestimo 6"
        };
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.atualizar(6, EmprestimoAtualizar))
            .toThrow(errIdNaoEncontrado);
    }
)

