const express = require('express')
const Route = express.Router()
const categoryController = require('../controller/category')
const { requireLogin, requireRole } = require('../middlewares/auth')
const { Trycatch } = require('../middlewares/errorHandle')
Route.get('/',
    Trycatch(categoryController.getAllCategory))
Route.get('/:id',
    Trycatch(categoryController.getCategoryByID))
Route.post('/',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(categoryController.createCategory))
Route.put('/:id',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(categoryController.updateCategoryByID))
Route.delete('/:id',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(categoryController.deleteCategoryByID))
module.exports = Route