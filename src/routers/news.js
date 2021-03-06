const Route = require('express').Router();
const newsController = require('../controller/news')
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole, requireCustomerLogin } = require('../middlewares/auth')
const { store } = require('../middlewares/multer')
Route.get('/',
  Trycatch(newsController.getAllNews));

Route.get('/:id',
  Trycatch(newsController.getNewsById));


Route.post('/',
  requireLogin,
  requireRole("ADMIN"),
  store.array('imagesnews', 15),
  Trycatch(newsController.createNews));
Route.post('/comment',
  Trycatch(newsController.createNewsComment)
)
Route.post('/upload_multiple',
  // requireLogin,
  // requireRole('ADMIN'),
  store.single('upload'),
  Trycatch(newsController.uploadMultipleNewsImage)
);
Route.post('/newsImage/delete',
  requireLogin,
  requireRole('ADMIN'),
  Trycatch(newsController.deleteNewsImage)
);

Route.put('/:id',
  requireLogin,
  requireRole("ADMIN"),
  Trycatch(newsController.updateNews));
Route.put('/comment/:commentID',
  requireCustomerLogin,
  Trycatch(newsController.updateNewsComment)
)
Route.delete('/comment/:commentID',
  requireCustomerLogin,
  Trycatch(newsController.deleteNewsComment)
)
Route.delete('/:id',
  requireLogin,
  requireRole("ADMIN"),
  Trycatch(newsController.deleteNews));
module.exports = Route