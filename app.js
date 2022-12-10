const emprestimoNegocio = require('./negocio/emprestimo_negocio')

async function main() {
      
    const listaEmprestimo = await emprestimoNegocio.listar();
    console.log("Lista de Emprestimos",listaEmprestimo);
 
    try{ 
        const emprestimo_1 = await emprestimoNegocio.buscarPorId(1);
        console.log("Emprestimo 1", emprestimo_1);
    } catch (err) {                                                                           
        console.log("Erro", err);
    }

    try{ 
        const emprestimo_2 = await emprestimoNegocio.buscarPorId(2);
        console.log("Empretimo 2 = ", emprestimo_2);
    } catch (err) {
        console.log("Erro", err);
    }

    //Inesistente  
    try{
        const emprestimo_3 = await emprestimoNegocio.buscarPorNome('PEQUENO PRINCIPE');
        console.log("Emprestimo 3 = 'PEQUENO'", emprestimo_3);
    } catch(err) {
        console.log("Erro", err);
    }

    try{
        const emprestimo_4 = await emprestimoNegocio.buscarPorNome('DOM CASMURRO');
        console.log("Emprestimo 4 = ", emprestimo_4);
    } catch(err) {
        console.log("Erro", err);
    }

   
   
    //Caso de sucesso
    try {
        const emprestimoInserido_11 = await emprestimoNegocio.inserir({id_usuario: 1,id_livro: 1,id_situacao: 1,dt_retirada: '20/11/2022',dt_devolucao_prevista: '22/11/2022'})
        console.log("Emprestimo Inserido", emprestimoInserido_11);
        } catch (err){
            console.log(err);
        } 
    
        try {
        const emprestimoInserido_12 = await emprestimoNegocio.inserir({id_usuario: 1,id_livro: 2,id_situacao: 2,dt_retirada: '21/11/2022',dt_devolucao_prevista: '23/11/2022'})
        console.log("Emprestimo Inserido", emprestimoInserido_12);
        } catch (err){
            console.log(err);
        } 
    
    //Caso de sucesso
    try{
        const emprestimoAtualizado = await emprestimoNegocio.atualizar(2, { id_situacao: '2', dt_entrega: '25/12/2022 00:00:01'});
        console.log("Emprestimo Atualizado", emprestimoAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Parametro preco é string
    try{
        const emprestimoAtualizado = await emprestimoNegocio.atualizar(3, { id_situacao: 2 , dt_entrega: '25/12/2022 00:00:00'});
        console.log("Emprestimo Atualizado", emprestimoAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Id inexistente
    try{
        const EmprestimoAtualizado = await emprestimoNegocio.atualizar(100, { nome: 'Emprestimo4'});
        console.log("Emprestimo atualizado", EmprestimoAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de sucesso
    try{
        //Trazer id válido
        const EmprestimoDeletado = await emprestimoNegocio.deletar(16);
        console.log("Emprestimo deletado", EmprestimoDeletado);
    } catch(err){
        console.log("Erro", err);
    }
    
    //Caso de insucesso: Id inexistente
    try{
        //Trazer id inválido
        const EmprestimoDeletado = await emprestimoNegocio.deletar(100);
        console.log("Emprestimo deletado", EmprestimoDeletado);
    } catch(err){
        console.log("Erro", err);
    }
}

main();

