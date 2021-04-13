const  Route = require('express').Router();
const orderController = require('../controller/order')
const {Trycatch} = require('../middlewares/errorHandle')

Route.get('/',
  Trycatch(orderController.getAllOrder));

Route.get('/:id',
  Trycatch(orderController.getOrderbyId));

Route.post('/',
  Trycatch(orderController.createOrder));

Route.put('/:id',
  Trycatch(orderController.updateOrder));
  
Route.delete('/:id',
  Trycatch(orderController.deleteOrder));

module.exports = Route