const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async show(request, response) {
        const produtos = await connection('produtos').select('*');
        
        return response.json(produtos);
    },

    async create(request, response) {
        const { titulo, descricao, imagem } = request.body;
        
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('produtos').insert({
            id,
            titulo,
            descricao,
            imagem,
        })
    
        return response.json({ id });
    }
}