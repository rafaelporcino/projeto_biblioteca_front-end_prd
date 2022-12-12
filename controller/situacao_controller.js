const situacaoNegocio = require('../negocio/situacao_negocio');                 


exports.inserir = async (req, res) => {                                         
  try {
  const situacao = req.body;
  situacaoNegocio.inserir(situacao);
  res.status(201).json(situacaoInserido);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.listar = async (req, res) => {                                          
  
  const listaUsers = await situacaoNegocio.listar();
  res.json(listaUsers);
}


exports.buscarPorId = async (req, res) => {                                     
  const id = req.params.id;
  try {
    const situacao = await situacaoNegocio.buscarPorId(id);
    res.json(situacao);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.atualizar = async (req, res) => {                                       
    
  const id = req.params.id;
  const situacao = req.body;
  try{
    situacaoNegocio.atualizar(id, situacao)
    res.json(situacaoAlterado);

  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.deletar = async (req, res) => {                                         
  
  const id = req.params.id;
  try{
    const situacaoDeletado = await   situacaoNegocio.deletar(id)

  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}