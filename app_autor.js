const express = require('express');
const autorNegocio = require('./negocio/autor_negocio')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/autores", async (req, res) => {
    try{
        const listaautores = await autorNegocio.listar();
        res.json(listaautores);
    } catch(err){ 
        res.status(500).json({Erro:"Erro na Aplicacao"});
    }

})

app.get("/autores/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const autor = await autorNegocio.buscarPorId(id);
        res.json(autor);
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

app.post("/autores",async (req, res) => {
    const autor = req.body;

    try{
        const autorInserido = await autorNegocio.inserir(autor);
        res.status(201).json(autorInserido);
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

app.put("/autores/:id", async (req, res) => {
    const id = req.params.id;
    let autor = req.body;

    try{
        const autorAtualizado = await autorNegocio.atualizar(id, autor);
        res.json(autorAtualizado);
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

app.delete("/autores/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const autorDeletado = await autorNegocio.deletar(id);
        res.json(autorDeletado);
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