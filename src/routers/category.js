const express = require('express')
const Route = express.Router()
const categoryController = require('../controller/category')
const { Trycatch } = require('../middlewares/errorHandle')
Route.get('/',
    Trycatch(categoryController.getAllCategory))
Route.get('/:id',
    Trycatch(categoryController.getCategorybyId))
Route.post('/',
    Trycatch(categoryController.createCategory))
Route.put('/:id',
    Trycatch(categoryController.updateCategorybyId))
Route.delete('/:id',
    Trycatch(categoryController.deleteCategorybyId))

module.exports = Route