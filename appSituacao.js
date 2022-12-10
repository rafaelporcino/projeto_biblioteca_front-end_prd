const situacaoNegocio = require('./negocio/situacao_negocio')


async function main() {
      
    const listaSituacao = await situacaoNegocio.listar();
    console.log("Lista de Situacao",listaSituacao);
 
    try{ 
        const situacao_1 = await situacaoNegocio.buscarPorId(1);
        console.log("Situacao 1", situacao_1);
    } catch (err) {                                                                           
        console.log("Erro", err); 
    }

    try{ 
        const situacao_2 = await situacaoNegocio.buscarPorId(2);
        console.log("Situacao 2 = ", situacao_2);
    } catch (err) {
        console.log("Erro", err);
    }

    //Inesistente  
    try{
        const situacao_3 = await situacaoNegocio.buscarPorNome('Verificar');
        console.log("Situacao 3 = 'Verificar'", situacao_3);
    } catch(err) {
        console.log("Erro", err);
    }

    try{
        const situacao_4 = await situacaoNegocio.buscarPorNome('Disponivel');
        console.log("Situacao 4 = 'Disponivel'", situacao_4);
    } catch(err) {
        console.log("Erro", err);
    }
  
    //Caso de sucesso
    try{
        const situacaoAtualizado = await situacaoNegocio.atualizar(2, { descricao: 'Disponivel'});
        console.log("Situacao Atualizado", situacaoAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Parametro nome é string
    try{
        const situacaoAtualizado = await situacaoNegocio.atualizar(3, { descricao: 2 });
        console.log("Situacao Atualizado", situacaoAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Id inexistente
    try{
        const situacaoAtualizado = await situacaoNegocio.atualizar(100, { nome: 'Verificar'});
        console.log("Situacao atualizado", situacaoAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de sucesso
    try{
        //Trazer id válido
        const situacaoDeletado = await situacaoNegocio.deletar(3);
        console.log("Situação deletada", situacaoDeletado);
    } catch(err){
        console.log("Erro", err);
    }
    
    //Caso de insucesso: Id inexistente
    try{
        //Trazer id inválido
        const situacaoDeletado = await situacaoNegocio.deletar(100);
        console.log("Situacao deletada", situacaoDeletado);
    } catch(err){
        console.log("Erro", err);
    }
    
}

main();

