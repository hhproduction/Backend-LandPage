const express = require('express')
const Route = express.Router()
const parameter = require('../controller/parameter')
const { Trycatch } = require('../middlewares/errorHandle')

Route.get('/list-category-id', Trycatch(parameter.parameterCategory))
Route.get('/list-product-id', Trycatch(parameter.parameterProduct))
Route.get('/list-account-id', Trycatch(parameter.parameterAccount))
Route.get('/list-order-id', Trycatch(parameter.parameterOrder))

module.exports = Route