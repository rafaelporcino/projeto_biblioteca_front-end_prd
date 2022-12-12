const express = require('express');                 // Importa o framework EXPRESS do NODE.JS 
const rota = express.Router();                      

const autorController = require('../controller/livro_controller');      // CONTROLLER

rota.post('/', livroController.inserir);          
rota.get('/', livroController.listar);            
rota.get('/:id', livroController.buscarPorId);    
rota.put('/:id', livroController.atualizar);      
rota.delete('/:id', livroController.deletar);     

module.exports = rota;                            