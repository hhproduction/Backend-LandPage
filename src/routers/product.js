const Route = require('express').Router();
const productController = require('../controller/product')
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole } = require('../middlewares/auth')
const { store } = require('../middlewares/multer')
const { errorHandle } = require('../middlewares/errorHandle')

Route.get('/',
  Trycatch(productController.getAllproduct));
Route.get('/number_buy_sort',
  Trycatch(productController.getAllProductSortedByNumberBuy));
Route.get('/price_sort_asc',
  Trycatch(productController.getAllProductSortedByPriceASC));
Route.get('/price_sort_desc',
  Trycatch(productController.getAllProductSortedByPriceDESC));
Route.get('/time_sort',
  Trycatch(productController.getAllProductSortedByTime));
Route.get('/related_product/:productID',
  Trycatch(productController.getRelatedProduct)
);

Route.get('/category/:categoryId',
  Trycatch(productController.getProductByCategoryID));
Route.get('/category_sort_number_buy/:categoryId',
  Trycatch(productController.getProductByCategoryIDSortedByNumberBuy));
Route.get('/category_sort_price_asc/:categoryId',
  Trycatch(productController.getProductByCategoryIDSortedByPriceASC));
Route.get('/category_sort_price_desc/:categoryId',
  Trycatch(productController.getProductByCategoryIDSortedByPriceDESC));
Route.get('/category_sort_time/:categoryId',
  Trycatch(productController.getProductByCategoryIDSortedByTime));
Route.get('/producer/:producerId',
  Trycatch(productController.getProductByProducerID));
Route.get('/:id',
  Trycatch(productController.getProductById));
Route.get('/search/:name',
  Trycatch(productController.getProductByName));

Route.post('/',
  requireLogin,
  requireRole("ADMIN"),
  store.array('imagesProduct', 15),
  Trycatch(productController.createProduct));
Route.post('/variant/:productID',
  requireLogin,
  requireRole("ADMIN"),
  store.single('imagesProduct'),
  Trycatch(productController.createProductVariant));
// Route.post('/upload_multiple/:id',
//   requireLogin,
//   requireRole('ADMIN'),

//   Trycatch(productController.uploadMultipleProductImage)
// );
Route.post('/productImage/delete',
  requireLogin,
  requireRole('ADMIN'),
  Trycatch(productController.deleteProductImage)
)

Route.put('/:id',
  requireLogin,
  requireRole("ADMIN"),
  Trycatch(productController.updateProduct));
Route.put('/comment/:commentID', Trycatch(productController.updateProductComment))
Route.delete('/:id',
  requireLogin,
  requireRole("ADMIN"),
  Trycatch(productController.deleteProduct));
Route.delete('/variant/:variantID',
  requireLogin,
  requireRole('ADMIN'),
  Trycatch(productController.deleteProductVariantByID)
)
Route.delete('/comment/:commentID', Trycatch(productController.deleteProductCommentByID))
module.exports = Route