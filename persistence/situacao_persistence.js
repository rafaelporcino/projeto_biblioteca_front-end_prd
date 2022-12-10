const { Client } = require('pg')
const { conexao } = require('./conexao')

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const sql = `SELECT situacao.id,
                        situacao.descricao       
                   FROM situacao`;
    const res = await cliente.query(sql);    
    await cliente.end();
    return res.rows;
}

async function inserir(situacao) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('INSERT INTO situacao(descricao) VALUES ($1) RETURNING *', 
        [situacao.descricao]);
    await cliente.end();
    return res.rows[0]
}

   
async function buscarPorId(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT situacao.id,situacao.descricao from situacao WHERE situacao.id=$1',[id]);
    await cliente.end();
    return res.rows[0];
}

async function buscarPorNome(nome) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT situacao.id,situacao.descricao from situacao WHERE situacao.descricao=$1',[nome]);
    await cliente.end();
    return res.rows;
}

async function atualizar(id, produto) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('UPDATE situacao SET descricao=$1 WHERE id=$2 RETURNING *', 
        [situacao.descricao, id]);
    await cliente.end();
    return res.rows[0]
}

async function deletar(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('DELETE FROM situacao WHERE id=$1 RETURNING *',[id]);
    await cliente.end();
    return res.rows[0];
}

module.exports = {
    listar, 
    inserir,         
    buscarPorId, 
    buscarPorNome,
    atualizar,
    deletar
}