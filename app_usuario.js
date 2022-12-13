const express = require('express');
const usuarioNegocio = require('./negocio/usuario_negocio')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/usuarios", async (req, res) => {
    try{
        const listausuarios = await usuarioNegocio.listar();
        res.json(listausuarios);
    } catch(err){ 
        res.status(500).json({Erro:"Erro na Aplicacao"});
    }

})

app.get("/usuarios/:id", async (req, res) => {
    const id = req.params.id;

    try{
        const usuario = await usuarioNegocio.buscarPorId(id);
        res.json(usuario);
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

app.post("/usuarios",async (req, res) => {
    const usuario = req.body;

    try{
        const usuarioInserido = await usuarioNegocio.inserir(usuario);
        res.status(201).json(usuarioInserido);
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

app.put("/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    let usuario = req.body;

    try{
        const usuarioAtualizado = await usuarioNegocio.atualizar(id, usuario);
        res.json(usuarioAtualizado);
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

app.delete("/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const usuarioDeletado = await usuarioNegocio.deletar(id);
        res.json(usuarioDeletado);
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