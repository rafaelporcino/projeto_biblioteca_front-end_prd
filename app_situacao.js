const express = require('express');
const situacaoNegocio = require('./negocio/situacao_negocio')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/situacoes", async (req, res) => {
    try{
        const listasituacoes = await situacaoNegocio.listar();
        res.json(listasituacoes);
    } catch(err){ 
        res.status(500).json({Erro:"Erro na Aplicacao"});
    }

})

app.get("/situacoes/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const situacao = await situacaoNegocio.buscarPorId(id);
        res.json(situacao);
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

app.post("/situacoes",async (req, res) => {
    const situacao = req.body;

    try{
        const situacaoInserido = await situacaoNegocio.inserir(situacao);
        res.status(201).json(situacaoInserido);
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

app.put("/situacoes/:id", async (req, res) => {
    const id = req.params.id;
    let situacao = req.body;

    try{
        const situacaoAtualizado = await situacaoNegocio.atualizar(id, situacao);
        res.json(situacaoAtualizado);
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

app.delete("/situacoes/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const situacaoDeletado = await situacaoNegocio.deletar(id);
        res.json(situacaoDeletado);
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