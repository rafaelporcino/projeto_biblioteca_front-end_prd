const usuarioNegocio = require('./negocio/usuario_negocio')


async function main() {
      
    const listaUsuario = await usuarioNegocio.listar();
    console.log("Lista de Usuários",listaUsuario);
 
    try{ 
        const usuario_1 = await usuarioNegocio.buscarPorId(1);
        console.log("Usuário 1", usuario_1);
    } catch (err) {                                                                           
        console.log("Erro", err); 
    }

    try{ 
        const usuario_2 = await usuarioNegocio.buscarPorId(2);
        console.log("Usuário 2 = ", usuario_2);
    } catch (err) {
        console.log("Erro", err);
    }

    //Inesistente  
    try{
        const usuario_3 = await usuarioNegocio.buscarPorNome('Rafael');
        console.log("usuario 3 = 'Rafael'", usuario_3);
    } catch(err) {
        console.log("Erro", err);
    }

    try{
        const usuario_4 = await usuarioNegocio.buscarPorNome('Joana');
        console.log("usuario 4 = 'Joana'", usuario_4);
    } catch(err) {
        console.log("Erro", err);
    }
  
    //Caso de sucesso
    try{
        const usuarioAtualizado = await usuarioNegocio.atualizar(2, { inome: 'João'});
        console.log("usuario Atualizado", usuarioAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Parametro nome é string
    try{
        const usuarioAtualizado = await usuarioNegocio.atualizar(3, { nome: 2 });
        console.log("usuario Atualizado", usuarioAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Id inexistente
    try{
        const usuarioAtualizado = await usuarioNegocio.atualizar(100, { nome: 'Maria'});
        console.log("Usuario atualizado", usuarioAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de sucesso
    try{
        //Trazer id válido
        const usuarioDeletado = await usuarioNegocio.deletar(3);
        console.log("Usuário deletado", usuarioDeletado);
    } catch(err){
        console.log("Erro", err);
    }
    
    //Caso de insucesso: Id inexistente
    try{
        //Trazer id inválido
        const usuarioDeletado = await usuarioNegocio.deletar(100);
        console.log("Usuário deletado", usuarioDeletado);
    } catch(err){
        console.log("Erro", err);
    }
    
}

main();

