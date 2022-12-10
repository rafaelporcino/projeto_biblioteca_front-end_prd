const cadastro = require("./persistence/situacao_persistence")

//Cenario de Sucesso!
test ('Buscar Por Id 2 deve retornar Situacao 2',
    function() {
        let Situacao2 = {
            id:2, 
            nome:"Situacao 2"
        };

        expect(cadastro.buscarPorId(2))
            .toEqual(Situacao2);
    }
)

//Cenario de Insucesso - Não existe Situacao 6!
test ('Buscar Por Id 6 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.buscarPorId(6))
            .toThrow(errIdNaoEncontrado);
    }
)

test ('Inserir Situacao 4 deve ser inserido na lista com id 4 gerado',
    function() {
        const SituacaoInserir = {nome:"Situacao 4"};
        cadastro.inserir(SituacaoInserir);
        expect(cadastro.listar())
            .toEqual(listaInseridoEsperado);
    })

//Cenário de Sucesso
test ('Alterar Situacao com id 1 para nome "Situacao X" deve atualizar na lista',
    function() {
        const SituacaoAtualizadoEsperado = {id:1, nome:"Situacao X"};
        const SituacaoAtualizar = {nome:"Situacao X"};
        const idAtualizar = 1;

        cadastro.atualizar(idAtualizar, SituacaoAtualizar);

        expect(cadastro.buscarPorId(1))
            .toEqual(SituacaoAtualizadoEsperado);

        expect(cadastro.listar())
            .toEqual(listaAtualizadoEsperado);

    }
)

//Cenario de Insucesso - Não existe Situacao 6!
test ('Atualizar o Situacao com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const SituacaoAtualizar = {
            nome:"Situacao 6"
        };
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.atualizar(6, SituacaoAtualizar))
            .toThrow(errIdNaoEncontrado);
    }
)

//Cenário de Sucesso
test ('Deletar o Situacao com id 1 deve remover tal Situacao da lista',
    function() {
        cadastro.deletar(1);
        expect(cadastro.listar())
            .toEqual(listaDeletadoEsperado);
    }
)

//Cenario de Insucesso - Não existe Situacao 6!
test ('Deletar o Situacao com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.deletar(6))
            .toThrow(errIdNaoEncontrado);
    }
)
