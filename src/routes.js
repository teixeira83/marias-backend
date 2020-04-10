const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const ProdutoController = require('./controllers/ProdutoController');


const routes = express.Router();

routes.get('/produtos', ProdutoController.show)
routes.post('/produtos', multer(multerConfig).single('file'), ProdutoController.create);

module.exports = routes;