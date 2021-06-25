const Route = require('express').Router();
const newsController = require('../controller/news')
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole } = require('../middlewares/auth')
const store = require('../middlewares/multer')
Route.get('/',
  Trycatch(newsController.getAllNews));

Route.get('/:id',
  Trycatch(newsController.getNewsById));


Route.post('/',
  requireLogin,
  requireRole("ADMIN"),
  Trycatch(newsController.createNews));

Route.post('/upload_multiple/:id',
  requireLogin,
  requireRole('ADMIN'),
  store.storeNews.array('imagesnews', 15),
  Trycatch(newsController.uploadMultipleNewsImage)
);
Route.post('/newsImage/delete',
  requireLogin,
  requireRole('ADMIN'),
  Trycatch(newsController.deleteNewsImage)
)

Route.put('/:id',
  requireLogin,
  requireRole("ADMIN"),
  Trycatch(newsController.updateNews));

Route.delete('/:id',
  requireLogin,
  requireRole("ADMIN"),
  Trycatch(newsController.deleteNews));
module.exports = Route