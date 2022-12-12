const autorNegocio = require('../negocio/autor_negocio');                 


exports.inserir = async (req, res) => {                                        
  try {
  const autor = req.body;
  autorNegocio.inserir(autor);
  res.status(201).json(autorInserido);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.listar = async (req, res) => {                                         
  
  const listaUsers = await autorNegocio.listar();
  res.json(listaUsers);
}


exports.buscarPorId = async (req, res) => {                                   
  const id = req.params.id;
  try {
    const autor = await autorNegocio.buscarPorId(id);
    res.json(autor);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.atualizar = async (req, res) => {                                      
    
  const id = req.params.id;
  const autor = req.body;
  try{
    autorNegocio.atualizar(id, autor)
    res.json(autorAlterado);

  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.deletar = async (req, res) => {                                        
  
  const id = req.params.id;
  try{
    const autorDeletado = await   autorNegocio.deletar(id)

  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}