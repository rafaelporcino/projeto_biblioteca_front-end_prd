const { Client } = require('pg')
const { conexao } = require('./conexao')

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const sql = `SELECT emprestimo.id,
                        usuario.id as id_usuario,
                        usuario.username,
                        livro.id as id_livro,
                        livro.titulo,
                        situacao.id  as id_situacao,
                        situacao.descricao,
                        emprestimo.dt_retirada,
                        emprestimo.dt_devolucao_prevista,
                        emprestimo.dt_entrega                        
                   FROM emprestimo
             INNER JOIN usuario  ON usuario.id  = emprestimo.id_usuario 
             INNER JOIN livro    ON livro.id    = emprestimo.id_livro 
             INNER JOIN situacao ON situacao.id = emprestimo.id_situacao 
                `;
    const res = await cliente.query(sql);
    let listaEmprestimo = res.rows.map(function(data) {
        return {id: data.id,                
                usuario:   {id: data.id_usuario, username: data.username },
                livro:     {id: data.id_livro, titulo: data.titulo},
                situacao:  {id: data.id_situacao , descricao: data.descricao},
                dt_retirada: data.dd_retirada,
                dt_devolucao_prevista: data.dt_devolucao_prevista,
                dt_entrega: data.dt_entrega                        
        };
    })
    await cliente.end();
    return listaEmprestimo;
}

async function inserir(emprestimo) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('INSERT INTO emprestimo(id_usuario,id_livro,id_situacao,dt_retirada,dt_devolucao_prevista) VALUES ($1,$2,$3,$4,$5) RETURNING *', 
        [emprestimo.id_usuario, emprestimo.id_livro, emprestimo.id_situacao,emprestimo.dt_retirada,emprestimo.dt_devolucao_prevista]);
    await cliente.end();
    return res.rows[0]
}


async function atualizar(id, emprestimo) {
        const cliente = new Client(conexao)
    
        await cliente.connect();
    
        const res = await cliente.query('UPDATE emprestimo SET id_situacao=$1, dt_entrega=$2 WHERE id=$3 RETURNING *', 
            [emprestimo.id_situacao, emprestimo.dt_entrega, id]);
        await cliente.end();
        return res.rows[0]
    }
   
async function buscarPorId(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT emprestimo.id,usuario.id as id_usuario,usuario.username, livro.id as id_livro,livro.titulo,situacao.id  as id_situacao,situacao.descricao,emprestimo.dt_retirada,emprestimo.dt_devolucao_prevista,emprestimo.dt_entrega FROM emprestimo  INNER JOIN usuario  ON usuario.id  = emprestimo.id_usuario  INNER JOIN livro    ON livro.id    = emprestimo.id_livro  INNER JOIN situacao ON situacao.id = emprestimo.id_situacao  WHERE emprestimo.id=$1',[id]);
    await cliente.end();
    return res.rows[0];
}

async function buscarPorNome(nome) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT emprestimo.id,usuario.id as id_usuario,usuario.username, livro.id as id_livro,livro.titulo,situacao.id  as id_situacao,situacao.descricao,emprestimo.dt_retirada,emprestimo.dt_devolucao_prevista,emprestimo.dt_entrega FROM emprestimo  INNER JOIN usuario  ON usuario.id  = emprestimo.id_usuario  INNER JOIN livro    ON livro.id    = emprestimo.id_livro  INNER JOIN situacao ON situacao.id = emprestimo.id_situacao WHERE livro.titulo=$1',[nome]);
    await cliente.end();
    return res.rows;
}

module.exports = {
    listar, 
    inserir,         
    buscarPorId, 
    buscarPorNome,
    atualizar
}