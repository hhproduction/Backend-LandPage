//authentication
const R = require('express').Router()
const authController = require('../controller/auth')
const { requireLogin, requireRole } = require('../middlewares/auth')
const { Trycatch } = require('../middlewares/errorHandle')
R.post('/login', Trycatch((authController.login)))

R.get('/me', requireLogin, requireRole('ADMIN'),  Trycatch(authController.getMe))


// const logout =2
module.exports = R
