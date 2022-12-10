const { Client } = require('pg')
const { conexao } = require('./conexao')

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const sql = `SELECT usuario.id,
                        usuario.nome, 
                        usuario.username         
                   FROM usuario`;
    const res = await cliente.query(sql);    
    await cliente.end();
    return res.rows;
}

async function inserir(usuario) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('INSERT INTO usuario(nome,username,password) VALUES ($1,$2,$3) RETURNING *', 
        [usuario.nome, usuario.username, usuario.password]);
    await cliente.end();
    return res.rows[0]
}


async function atualizarUsuario(id, usuario) {
        const cliente = new Client(conexao)
    
        await cliente.connect();
    
        const res = await cliente.query('UPDATE usuario SET nome=$1, password=$2 WHERE id=$3 RETURNING *', 
            [usuario.nome, usuario.password, id]);
        await cliente.end();
        return res.rows[0]
    }
    
async function buscarPorId(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT id,nome,username from usuario WHERE usuario.id=$1',[id]);
    await cliente.end();
    return res.rows[0];
}

async function buscarPorNome(nome) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT id,nome,username from usuario WHERE usuario.nome=$1',[nome]);
    await cliente.end();
    return res.rows;
}

async function atualizar(id, usuario) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('UPDATE usuario SET nome=$1, password=$2 WHERE id=$3 RETURNING *', 
        [usuario.nome, usuario.password, id]);
    await cliente.end();
    return res.rows[0]
}

async function deletar(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('DELETE FROM usuario WHERE id=$1 RETURNING *',[id]);
    await cliente.end();
    return res.rows[0];
}

module.exports = {
    listar, 
    inserir,     
    atualizarUsuario,
    buscarPorId, 
    buscarPorNome,
    atualizar,
    deletar
}