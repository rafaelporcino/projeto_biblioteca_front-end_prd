const cadastro = require("./persistence/autor_persistence")

//Cenario de Sucesso!
test ('Buscar Por Id 2 deve retornar Autor 2',
    function() {
        let Autor2 = {
            id:2, 
            nome:"Joaquim Manuel de Macedo"
        };

        expect(cadastro.buscarPorId(2))
            .toEqual(Autor2);
    }
)

//Cenario de Insucesso - Não existe Autor 6!
test ('Buscar Por Id 6 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.buscarPorId(6))
            .toThrow(errIdNaoEncontrado);
    }
)

test ('Inserir Autor 4 deve ser inserido na lista com id 4 gerado',
    function() {
        const AutorInserir = {nome:"Autor teste"};
        cadastro.inserir(AutorInserir);
        expect(cadastro.listar())
            .toEqual(listaInseridoEsperado);
    })

//Cenário de Sucesso
test ('Alterar Autor com id 1 para nome "Autor X" na lista',
    function() {
        const AutorAtualizadoEsperado = {id:1, nome:"Autor X"};
        const AutorAtualizar = {nome:"Autor X"};
        const idAtualizar = 1;

        cadastro.atualizar(idAtualizar, AutorAtualizar);

        expect(cadastro.buscarPorId(1))
            .toEqual(AutorAtualizadoEsperado);

        expect(cadastro.listar())
            .toEqual(listaAtualizadoEsperado);

    }
)

//Cenario de Insucesso - Não existe Autor 6!
test ('Atualizar o Autor com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const AutorAtualizar = {
            nome:"Autor 6"
        };
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.atualizar(6, AutorAtualizar))
            .toThrow(errIdNaoEncontrado);
    }
)

//Cenário de Sucesso
test ('Deletar o Autor com id 1 deve remover tal Autor da lista',
    function() {
        cadastro.deletar(1);
        expect(cadastro.listar())
            .toEqual(listaDeletadoEsperado);
    }
)

//Cenario de Insucesso - Não existe Autor 6!
test ('Deletar o Autor com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.deletar(6))
            .toThrow(errIdNaoEncontrado);
    }
)
