const Route = require('express').Router();
const orderController = require('../controller/order')
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole, requireCustomerLogin } = require('../middlewares/auth')

Route.get('/guest',
  requireLogin,
  requireRole('ADMIN'),
  Trycatch(orderController.getAllGuestOrder)
)
Route.get('/customer',
  requireLogin,
  requireRole('ADMIN'),
  Trycatch(orderController.getAllCustomerOrder)
)
Route.get('/guest/:phone',
  Trycatch(orderController.getGuestOrderbyPhone));
Route.get('/customer/:id', requireLogin,
  requireRole('ADMIN'),
  Trycatch(orderController.getCustomerOrderbyId));
Route.get('/orderInfo', requireCustomerLogin,
  Trycatch(orderController.getCustomerOrderInfo));
Route.post('/guest',
  Trycatch(orderController.createGuestOrder));
Route.post('/customer', requireCustomerLogin,
  Trycatch(orderController.createCustomerOrder));

Route.put('/guest/:id',
  Trycatch(orderController.updateGuestOrderById));
Route.put('/customer/:id', requireCustomerLogin,
  Trycatch(orderController.updateCustomerOrderById));

Route.delete('/:id', requireLogin,
  requireRole('ADMIN'),
  Trycatch(orderController.deleteOrderById));

module.exports = Route