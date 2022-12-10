const { Client } = require('pg')
const { conexao } = require('./conexao')

async function listar() {
    const cliente = new Client(conexao)
    await cliente.connect();
    const sql = `SELECT livro.id,
                        autor.id,
                        autor.nome,                       
                        livro.titulo
                   FROM livro             
             INNER JOIN autor    ON autor.id    = livro.id_autor              
                `;
    const res = await cliente.query(sql);
    let listalivro = res.rows.map(function(data) {
        return {id: data.id,                                
                livro:     {id: data.id, titulo: data.nome},                
                titulo:    data.titulo
        };
    })
    await cliente.end();
    return listalivro;
}

async function inserir(livro) {
    const cliente = new Client(conexao)

    await cliente.connect();

    const res = await cliente.query('INSERT INTO livro(id_autor,titulo) VALUES ($1,$2) RETURNING *', 
        [livro.id_autor, livro.titulo]);
    await cliente.end();
    return res.rows[0]
}


async function atualizar(id, livro) {
        const cliente = new Client(conexao)
    
        await cliente.connect();
    
        const res = await cliente.query('UPDATE livro SET titulo=$1 WHERE id=$2 RETURNING *', 
            [livro.titulo, id]);
        await cliente.end();
        return res.rows[0]
    }
   
async function buscarPorId(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT livro.id,autor.id,autor.nome,livro.titulo FROM livroINNER JOIN autor ON livro.id = livro.id_autor where   WHERE livro.id=$1',[id]);
    await cliente.end();
    return res.rows[0];
}

async function buscarPorNome(nome) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT livro.id,autor.id,autor.nome,livro.titulo FROM livroINNER JOIN autor ON livro.id = livro.id_autor where  WHERE livro.titulo=$1',[nome]);
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