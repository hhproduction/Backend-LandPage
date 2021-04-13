const Route = require('express').Router();
const productController = require('../controller/product')
const { Trycatch } = require('../middlewares/errorHandle')
Route.get('/',
  Trycatch(productController.getAllproduct));

Route.get('/category/:categoryId',
  Trycatch(productController.getProductbyCategoryID));
Route.get('/:id',
  Trycatch(productController.getProductbyId));

Route.post('/',
  Trycatch(productController.createProduct));

Route.put('/:id',
  Trycatch(productController.updateProduct));

Route.delete('/:id',
  Trycatch(productController.deleteProduct));

module.exports = Route