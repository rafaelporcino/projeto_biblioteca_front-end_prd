const cadastro = require("./persistence/usuario_persistence")

//Cenario de Sucesso!
test ('Buscar Por Id 2 deve retornar Usuario 2',
    function() {
        let Usuario2 = {
            id:2, 
            nome:"Usuario 2"
        };

        expect(cadastro.buscarPorId(2))
            .toEqual(Usuario2);
    }
)

//Cenario de Insucesso - Não existe Usuario 6!
test ('Buscar Por Id 6 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.buscarPorId(6))
            .toThrow(errIdNaoEncontrado);
    }
)

test ('Inserir Usuario 4 deve ser inserido na lista com id 4 gerado',
    function() {
        const UsuarioInserir = {nome:"Usuario 4"};
        cadastro.inserir(UsuarioInserir);
        expect(cadastro.listar())
            .toEqual(listaInseridoEsperado);
    })

//Cenário de Sucesso
test ('Alterar Usuario com id 1 para nome "Usuario X" deve atualizar na lista',
    function() {
        const UsuarioAtualizadoEsperado = {id:1, nome:"Usuario X"};
        const UsuarioAtualizar = {nome:"Usuario X"};
        const idAtualizar = 1;

        cadastro.atualizar(idAtualizar, UsuarioAtualizar);

        expect(cadastro.buscarPorId(1))
            .toEqual(UsuarioAtualizadoEsperado);

        expect(cadastro.listar())
            .toEqual(listaAtualizadoEsperado);

    }
)

//Cenario de Insucesso - Não existe Usuario 6!
test ('Atualizar o Usuario com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const UsuarioAtualizar = {
            nome:"Usuario 6"
        };
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.atualizar(6, UsuarioAtualizar))
            .toThrow(errIdNaoEncontrado);
    }
)

//Cenário de Sucesso
test ('Deletar o Usuario com id 1 deve remover tal Usuario da lista',
    function() {
        cadastro.deletar(1);
        expect(cadastro.listar())
            .toEqual(listaDeletadoEsperado);
    }
)

//Cenario de Insucesso - Não existe Usuario 6!
test ('Deletar o Usuario com Id 6 deve gerar exceção id nao encontrado',
    function() {
        const errIdNaoEncontrado = "ID nao encontrado";
        expect(() => cadastro.deletar(6))
            .toThrow(errIdNaoEncontrado);
    }
)
