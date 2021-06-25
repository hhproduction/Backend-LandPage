//authentication
const R = require('express').Router()
const authCustomerController = require('../controller/authCustomer')
const { requireLogin } = require('../middlewares/auth')
const { Trycatch } = require('../middlewares/errorHandle')
R.post('/login', Trycatch((authCustomerController.login)))

R.get('/me', requireLogin,  Trycatch(authCustomerController.getMe))


// const logout =2
module.exports = R
