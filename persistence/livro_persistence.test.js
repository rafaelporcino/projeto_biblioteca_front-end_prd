const cadastro = require("./persistence/livro_persistence")

//Cenario de Sucesso!
test ('Buscar Por Id 2 deve retornar Livro 2',
    function() {
        let Livro2 = {
            id:2, 
            nome:"Livro 2"
        };

        expect(cadastro.buscarPorId(2))
            .toEqual(Livro2);
    }
)

//Cenario de Insucesso - Não existe Livro 6!
test ('Buscar Por Id 6 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.buscarPorId(6))
            .toThrow(errIdNaoEncontrado);
    }
)

test ('Inserir Livro 4 deve ser inserido na lista com id 4 gerado',
    function() {
        const LivroInserir = {nome:"Livro 4"};
        cadastro.inserir(LivroInserir);
        expect(cadastro.listar())
            .toEqual(listaInseridoEsperado);
    })

//Cenário de Sucesso
test ('Alterar Livro com id 1 para nome "Livro X" deve atualizar na lista',
    function() {
        const LivroAtualizadoEsperado = {id:1, nome:"Livro X"};
        const LivroAtualizar = {nome:"Livro X"};
        const idAtualizar = 1;

        cadastro.atualizar(idAtualizar, LivroAtualizar);

        expect(cadastro.buscarPorId(1))
            .toEqual(LivroAtualizadoEsperado);

        expect(cadastro.listar())
            .toEqual(listaAtualizadoEsperado);

    }
)

//Cenario de Insucesso - Não existe Livro 6!
test ('Atualizar o Livro com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const LivroAtualizar = {
            nome:"Livro 6"
        };
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.atualizar(6, LivroAtualizar))
            .toThrow(errIdNaoEncontrado);
    }
)

//Cenário de Sucesso
test ('Deletar o Livro com id 1 deve remover tal Livro da lista',
    function() {
        cadastro.deletar(1);
        expect(cadastro.listar())
            .toEqual(listaDeletadoEsperado);
    }
)

//Cenario de Insucesso - Não existe Livro 6!
test ('Deletar o Livro com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.deletar(6))
            .toThrow(errIdNaoEncontrado);
    }
)
