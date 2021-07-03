const discountController = require('../controller/discount')
const Route = require('express').Router()
const { requireLogin, requireRole } = require('../middlewares/auth')
const { Trycatch } = require('../middlewares/errorHandle')
Route.get('/',
    requireLogin,
    requireRole('ADMIN'),
    Trycatch(discountController.getAllDiscount)
)
Route.get('/:productID',
    Trycatch(discountController.getDisCountByProduct)
)
Route.post('/',
    requireLogin,
    requireRole('ADMIN'),
    Trycatch(discountController.createDiscount)
)
Route.put('/:id',
    requireLogin,
    requireRole('ADMIN'),
    Trycatch(discountController.updateDiscountByID)
)
Route.delete('/:id',
    requireLogin,
    requireRole('ADMIN'),
    Trycatch(discountController.deleteDiscountByID)
)
module.exports = Route