const usuarioNegocio = require('../negocio/usuario_negocio');                 


exports.inserir = async (req, res) => {                                         
  try {
  const usuario = req.body;
  usuarioNegocio.inserir(usuario);
  res.status(201).json(usuarioInserido);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.listar = async (req, res) => {                                          
  
  const listaUsers = await usuarioNegocio.listar();
  res.json(listaUsers);
}


exports.buscarPorId = async (req, res) => {                                     
  const id = req.params.id;
  try {
    const usuario = await usuarioNegocio.buscarPorId(id);
    res.json(usuario);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.atualizar = async (req, res) => {                                       
    
  const id = req.params.id;
  const usuario = req.body;
  try{
    usuarioNegocio.atualizar(id, usuario)
    res.json(usuarioAlterado);

  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.deletar = async (req, res) => {                                         
  
  const id = req.params.id;
  try{
    const usuarioDeletado = await   usuarioNegocio.deletar(id)

  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}