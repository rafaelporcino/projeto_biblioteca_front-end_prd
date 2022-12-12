const express = require('express');                 // Importa o framework EXPRESS do NODE.JS 
const rota = express.Router();                   

const situacaoController = require('../controller/situacao_controller');  // CONTROLLER

rota.post('/', situacaoController.inserir);           
rota.get('/', situacaoController.listar);             
rota.get('/:id', situacaoController.buscarPorId);     
rota.put('/:id', situacaoController.atualizar);       
rota.delete('/:id', situacaoController.deletar);      

module.exports = rota;                             