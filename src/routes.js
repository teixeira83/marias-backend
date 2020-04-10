const express = require('express');

const ProdutoController = require('./controllers/ProdutoController');


const routes = express.Router();

routes.get('/produtos', ProdutoController.show)
routes.post('/produtos', ProdutoController.create);

module.exports = routes;