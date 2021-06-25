const express = require('express')
const Route = express.Router()
const parameter = require('../controller/parameter')
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole } = require('../middlewares/auth')

Route.get('/list_category_id', Trycatch(parameter.parameterCategory))
Route.get('/list_product_id', Trycatch(parameter.parameterProduct))
Route.get('/list_account_id',
    requireLogin,
    requireRole('ADMIN'),
    Trycatch(parameter.parameterAccount))
Route.get('/list_order_id', Trycatch(parameter.parameterOrder))
Route.get('/list_customer_id',
    requireLogin,
    requireRole('ADMIN'),
    Trycatch(parameter.parameterCustomer))
Route.get('/list_producer_id', Trycatch(parameter.parameterProducer))

module.exports = Route