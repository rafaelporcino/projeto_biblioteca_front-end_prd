const express = require('express');
const livroNegocio = require('./negocio/livro_negocio')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/livros", async (req, res) => {
    try{
        const listalivros = await livroNegocio.listar();
        res.json(listalivros);
    } catch(err){ 
        res.status(500).json({Erro:"Erro na Aplicacao"});
    }

})

app.get("/livros/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const livro = await livroNegocio.buscarPorId(id);
        res.json(livro);
    }
    catch(err){
        if(err && err.id) {
            res.status(err.id).json({Erro: err.mensagem})
        }
        else {
            res.status(500).json({Erro:"Erro na Aplicacao"});
        }
    }

    
})

app.post("/livros",async (req, res) => {
    const livro = req.body;

    try{
        const livroInserido = await livroNegocio.inserir(livro);
        res.status(201).json(livroInserido);
    }
    catch(err){
        if(err && err.id) {
            res.status(err.id).json({Erro: err.mensagem})
        }
        else {
            res.status(500).json({Erro:"Erro na Aplicacao"});
        }        
    }

})

app.put("/livros/:id", async (req, res) => {
    const id = req.params.id;
    let livro = req.body;

    try{
        const livroAtualizado = await livroNegocio.atualizar(id, livro);
        res.json(livroAtualizado);
    }
    catch(err){
        if(err && err.id) {
            res.status(err.id).json({Erro: err.mensagem})
        }
        else {
            console.log(err);
            res.status(500).json({Erro:"Erro na Aplicacao"});
        }        
    }
})

app.delete("/livros/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const livroDeletado = await livroNegocio.deletar(id);
        res.json(livroDeletado);
    }
    catch(err){
        if(err && err.id) {
            res.status(err.id).json({Erro: err.mensagem})
        }
        else {
            res.status(500).json({Erro:"Erro na Aplicacao"});
        }        
    }
})

app.listen(3000, () => {
    console.log ("Servidor iniciado na porta 3000");
})