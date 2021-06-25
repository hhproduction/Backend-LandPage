const Route = require('express').Router();
const orderDetailController = require('../controller/orderDetail')
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole } = require('../middlewares/auth')

Route.get('/',
  requireLogin,
  requireRole('ADMIN'),
  Trycatch(orderDetailController.getAllOrderDetail));

Route.get('/:id',
  Trycatch(orderDetailController.getOrderDetailbyId));

Route.post('/',
  Trycatch(orderDetailController.createOrderDetail));

Route.put('/:id',
  Trycatch(orderDetailController.updateOrderDetail));

Route.delete('/:id',
  Trycatch(orderDetailController.deleteOrderDetail));

module.exports = Route