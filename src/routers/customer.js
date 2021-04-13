const Route = require('express').Router();
const customerController = require('../controller/customer')
const { Trycatch } = require('../middlewares/errorHandle')
Route.get('/', Trycatch(customerController.getAllCustomer));
Route.get('/:id',Trycatch(customerController.getCustomerbyId));
Route.post('/',Trycatch(customerController.createCustomer));
Route.put('/:id',Trycatch(customerController.updateCustomer));
Route.delete('/:id',Trycatch(customerController.deleteCustomer));

module.exports = Route;
