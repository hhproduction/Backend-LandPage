const Route = require('express').Router();
const productController = require('../controller/product')
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole } = require('../middlewares/auth')
const store = require('../middlewares/multer')
Route.get('/',
  Trycatch(productController.getAllproduct));

Route.get('/category/:categoryId',
  Trycatch(productController.getProductByCategoryID));
Route.get('/producer/:producerId',
  Trycatch(productController.getProductByProducerID));
Route.get('/:id',
  Trycatch(productController.getProductById));
Route.get('/search/:name',
  Trycatch(productController.getProductByName));

Route.post('/',
  requireLogin,
  requireRole("ADMIN"),
  Trycatch(productController.createProduct));

Route.post('/upload_multiple/:id',
  requireLogin,
  requireRole('ADMIN'),
  store.storeProduct.array('imagesProduct', 15),
  Trycatch(productController.uploadMultipleProductImage)
);
Route.post('/productImage/delete',
  requireLogin,
  requireRole('ADMIN'),
  Trycatch(productController.deleteProductImage)
)

Route.put('/:id',
  requireLogin,
  requireRole("ADMIN"),
  Trycatch(productController.updateProduct));

Route.delete('/:id',
  requireLogin,
  requireRole("ADMIN"),
  Trycatch(productController.deleteProduct));
module.exports = Route