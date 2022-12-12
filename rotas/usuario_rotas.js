const express = require('express');                 // Importa o framework EXPRESS do NODE.JS 
const rota = express.Router();                      

const usuarioController = require('../controller/usuario_controller');      // CONTROLLER

rota.post('/', usuarioController.inserir);           
rota.get('/', usuarioController.listar);             
rota.get('/:id', usuarioController.buscarPorId);     
rota.put('/:id', usuarioController.atualizar);       
rota.delete('/:id', usuarioController.deletar);      

module.exports = rota;                               