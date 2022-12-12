const express = require('express');                 // Importa o framework EXPRESS do NODE.JS 
const rota = express.Router();                      

const autorController = require('../controller/autor_controller');      // CONTROLLER

rota.post('/', autorController.inserir);          
rota.get('/', autorController.listar);            
rota.get('/:id', autorController.buscarPorId);    
rota.put('/:id', autorController.atualizar);      
rota.delete('/:id', autorController.deletar);     

module.exports = rota;                            