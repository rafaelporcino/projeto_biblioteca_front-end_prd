const emprestimoNegocio = require('./negocio/emprestimo_negocio')


async function main() {
      
    const listaEmprestimo = await emprestimoNegocio.listar();
    console.log("Lista de Emprestimo",listaEmprestimo);
 
    try{ 
        const Emprestimo_1 = await emprestimoNegocio.buscarPorId(1);
        console.log("Emprestimo 1", Emprestimo_1);
    } catch (err) {                                                                           
        console.log("Erro", err); 
    }

    try{ 
        const Emprestimo_2 = await emprestimoNegocio.buscarPorId(2);
        console.log("Emprestimo 2 = ", Emprestimo_2);
    } catch (err) {
        console.log("Erro", err);
    }

    //Inesistente  
    try{
        const Emprestimo_3 = await emprestimoNegocio.buscarPorNome('Verificar');
        console.log("Emprestimo 3 = 'Verificar'", Emprestimo_3);
    } catch(err) {
        console.log("Erro", err);
    }

    try{
        const Emprestimo_4 = await emprestimoNegocio.buscarPorNome('Disponivel');
        console.log("Emprestimo 4 = 'Disponivel'", Emprestimo_4);
    } catch(err) {
        console.log("Erro", err);
    }
  
    //Caso de sucesso
    try{
        const EmprestimoAtualizado = await emprestimoNegocio.atualizar(2, { descricao: 'Disponivel'});
        console.log("Emprestimo Atualizado", EmprestimoAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Parametro nome é string
    try{
        const EmprestimoAtualizado = await emprestimoNegocio.atualizar(3, { descricao: 2 });
        console.log("Emprestimo Atualizado", EmprestimoAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Id inexistente
    try{
        const EmprestimoAtualizado = await emprestimoNegocio.atualizar(100, { nome: 'Verificar'});
        console.log("Emprestimo atualizado", EmprestimoAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de sucesso
    try{
        //Trazer id válido
        const EmprestimoDeletado = await emprestimoNegocio.deletar(3);
        console.log("Situação deletada", EmprestimoDeletado);
    } catch(err){
        console.log("Erro", err);
    }
    
    //Caso de insucesso: Id inexistente
    try{
        //Trazer id inválido
        const EmprestimoDeletado = await emprestimoNegocio.deletar(100);
        console.log("Emprestimo deletada", EmprestimoDeletado);
    } catch(err){
        console.log("Erro", err);
    }
    
}

main();

