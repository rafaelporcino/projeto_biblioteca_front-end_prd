const express = require('express');                 // Importa o framework EXPRESS do NODE
const rota = express.Router();                

const emprestimoController = require('../controller/emprestimo_controller.js');      // CONTROLLER

rota.post('/', emprestimoController.inserir);           
rota.get('/', emprestimoController.listar);             
rota.get('/:id', emprestimoController.buscarPorId);     
rota.put('/:id', emprestimoController.atualizar);       
rota.delete('/:id', emprestimoController.deletar);      

module.exports = rota;                             