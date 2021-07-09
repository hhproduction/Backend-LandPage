const Route = require('express').Router();
const orderController = require('../controller/order')
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole, requireCustomerLogin } = require('../middlewares/auth')

Route.get('/',
  requireLogin,
  requireRole('ADMIN'),
  Trycatch(orderController.getAllOrder)
)
Route.get('/guest/:phone',
  Trycatch(orderController.getGuestOrderbyPhone));
Route.get('/customer', requireCustomerLogin,
  Trycatch(orderController.getCustomerOrderbyId));
Route.get('/:orderCode', requireCustomerLogin,
  Trycatch(orderController.getOrderByID));
Route.post('/guest',
  Trycatch(orderController.createGuestOrder));
Route.post('/customer', requireCustomerLogin,
  Trycatch(orderController.createCustomerOrder));
Route.put('/customer/cancelOrder', requireCustomerLogin,
  Trycatch(orderController.cancelCustomerOrder));
Route.put('/orderCode', requireLogin,
  requireRole('ADMIN'),
  Trycatch(orderController.cancelOrder));
Route.delete('/:id', requireLogin,
  requireRole('ADMIN'),
  Trycatch(orderController.deleteOrderById));

module.exports = Route