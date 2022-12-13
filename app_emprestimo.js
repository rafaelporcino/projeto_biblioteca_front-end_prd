const express = require('express');
const emprestimoNegocio = require('./negocio/emprestimo_negocio')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/emprestimos", async (req, res) => {
    try{
        const listaemprestimos = await emprestimoNegocio.listar();
        res.json(listaemprestimos);
    } catch(err){ 
        res.status(500).json({Erro:"Erro na Aplicacao"});
    }

})

app.get("/emprestimos/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const emprestimo = await emprestimoNegocio.buscarPorId(id);
        res.json(emprestimo);
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

app.post("/emprestimos",async (req, res) => {
    const emprestimo = req.body;

    try{
        const emprestimoInserido = await emprestimoNegocio.inserir(emprestimo);
        res.status(201).json(emprestimoInserido);
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

app.put("/emprestimos/:id", async (req, res) => {
    const id = req.params.id;
    let emprestimo = req.body;

    try{
        const emprestimoAtualizado = await emprestimoNegocio.atualizar(id, emprestimo);
        res.json(emprestimoAtualizado);
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

app.delete("/emprestimos/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const emprestimoDeletado = await emprestimoNegocio.deletar(id);
        res.json(emprestimoDeletado);
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