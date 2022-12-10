const { Client } = require('pg')
const { conexao } = require('./conexao')

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const sql = `SELECT autor.id,
                        autor.nome       
                   FROM autor`;
    const res = await cliente.query(sql);    
    await cliente.end();
    return res.rows;
}

async function inserir(autor) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('INSERT INTO autor(nome) VALUES ($1) RETURNING *', 
        [autor.descricao]);
    await cliente.end();
    return res.rows[0]
}

   
async function buscarPorId(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT autor.id,autor.nome  WHERE autor.id=$1',[id]);
    await cliente.end();
    return res.rows[0];
}

async function buscarPorNome(nome) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT autor.id,autor.nome WHERE autor.nome=$1',[nome]);
    await cliente.end();
    return res.rows;
}

async function atualizar(id, produto) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('UPDATE autor SET nome=$1 WHERE id=$2 RETURNING *', 
        [autor.descricao, id]);
    await cliente.end();
    return res.rows[0]
}

async function deletar(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('DELETE FROM autor WHERE id=$1 RETURNING *',[id]);
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