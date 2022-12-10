const livroNegocio = require('./negocio/livro_negocio')


async function main() {
      
    const listaLivro = await livroNegocio.listar();
    console.log("Lista de Livro",listaLivro);
 
    try{ 
        const Livro_1 = await livroNegocio.buscarPorId(1);
        console.log("Livro 1", Livro_1);
    } catch (err) {                                                                           
        console.log("Erro", err); 
    }

    try{ 
        const Livro_2 = await livroNegocio.buscarPorId(2);
        console.log("Livro 2 = ", Livro_2);
    } catch (err) {
        console.log("Erro", err);
    }

    //Inesistente  
    try{
        const Livro_3 = await livroNegocio.buscarPorNome('Verificar');
        console.log("Livro 3 = 'Verificar'", Livro_3);
    } catch(err) {
        console.log("Erro", err);
    }

    try{
        const Livro_4 = await livroNegocio.buscarPorNome('Disponivel');
        console.log("Livro 4 = 'Disponivel'", Livro_4);
    } catch(err) {
        console.log("Erro", err);
    }
  
    //Caso de sucesso
    try{
        const LivroAtualizado = await livroNegocio.atualizar(2, { descricao: 'Disponivel'});
        console.log("Livro Atualizado", LivroAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Parametro nome é string
    try{
        const LivroAtualizado = await livroNegocio.atualizar(3, { descricao: 2 });
        console.log("Livro Atualizado", LivroAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de insucesso: Id inexistente
    try{
        const LivroAtualizado = await livroNegocio.atualizar(100, { nome: 'Verificar'});
        console.log("Livro atualizado", LivroAtualizado);
    }
    catch(err){
        console.log("Erro", err);
    }

    //Caso de sucesso
    try{
        //Trazer id válido
        const LivroDeletado = await livroNegocio.deletar(3);
        console.log("Situação deletada", LivroDeletado);
    } catch(err){
        console.log("Erro", err);
    }
    
    //Caso de insucesso: Id inexistente
    try{
        //Trazer id inválido
        const LivroDeletado = await livroNegocio.deletar(100);
        console.log("Livro deletada", LivroDeletado);
    } catch(err){
        console.log("Erro", err);
    }
    
}

main();

