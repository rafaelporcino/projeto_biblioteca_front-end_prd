const livroNegocio = require('../negocio/livro_negocio');                


exports.inserir = async (req, res) => {                                    
  try {
    const livro = req.body;
    livroNegocio.inserir(livro)
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.listar = async (req, res) => {                                         
	const listaEmprestimos = await livroNegocio.listar();
	res.json(listaEmprestimos);
  }


exports.buscarPorId = async (req, res) => {                                    
    const id = req.params.id;
    try {
      const busca = await livroNegocio.buscarPorId(id);
      res.json(busca);
    }catch(err){
      res.status(err.numero).json({erro: err.mensagem});
    }
}


exports.atualizar = async (req, res) => {                                      
    
  const id = req.params.id;
  const livro = req.body;
  try {
    const atualiza = await livroNegocio.atualizar(id, livro)
    res.json(atualiza);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.deletar = async (req, res) => {                                        
  
  const id = req.params.id;
  try{
    const deletado = livroNegocio.deletar(id)
    res.json(deletado);

  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}