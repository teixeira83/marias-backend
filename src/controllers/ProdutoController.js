const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async show(request, response) {
        const maximoDeProdutosPorPagina = 10;
        const { page = 1 } = request.query;

        const [count] = await connection('produtos').count();

        const produtos = await connection('produtos').select('*')
            .limit(maximoDeProdutosPorPagina)
            .offset((page - 1) * maximoDeProdutosPorPagina);

        response.header('X-Total-Count', count['count(*)']);       
        return response.json(produtos);
    },

    async create(request, response) {
        const { titulo, descricao } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        
        //verifica se a imagem veio junto com a requisicao
        if (request.file) {
            console.log(request.file)
            const { key: imgKey = '' , location: imgUrl = '' } = request.file;
        
            await connection('produtos').insert({
                id,
                titulo,
                descricao,
                imgKey,
                imgUrl
            })
        } else {
            const id = crypto.randomBytes(4).toString('HEX');
        
            await connection('produtos').insert({
                id,
                titulo,
                descricao,
                imgKey: '',
                imgUrl: process.env.AWS_DEFAULT_IMAGE
            })
        }

    
        return response.json({ id });
    }
}