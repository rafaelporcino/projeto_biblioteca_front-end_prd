const express = require('express');
const produtoNegocio = require('./negocio/produto_negocio')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/produtos", async (req, res) => {
    try{
        const listaProdutos = await produtoNegocio.listar();
        res.json(listaProdutos);
    } catch(err){ 
        res.status(500).json({Erro:"Erro na Aplicacao"});
    }

})

app.get("/produtos/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const produto = await produtoNegocio.buscarPorId(id);
        res.json(produto);
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

app.post("/produtos",async (req, res) => {
    const produto = req.body;

    try{
        const produtoInserido = await produtoNegocio.inserir(produto);
        res.status(201).json(produtoInserido);
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

app.put("/produtos/:id", async (req, res) => {
    const id = req.params.id;
    let produto = req.body;

    try{
        const produtoAtualizado = await produtoNegocio.atualizar(id, produto);
        res.json(produtoAtualizado);
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

app.delete("/produtos/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const produtoDeletado = await produtoNegocio.deletar(id);
        res.json(produtoDeletado);
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