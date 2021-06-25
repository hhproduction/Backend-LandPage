const Route = require('express').Router();
const customerController = require('../controller/customer')
const { Trycatch } = require('../middlewares/errorHandle')
const store = require('../middlewares/multer')
const { requireLogin, requireRole, requireCustomerLogin } = require('../middlewares/auth')
Route.get('/',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(customerController.getAllCustomer));
Route.get('/info',
    requireCustomerLogin,
    Trycatch(customerController.getCustomerInfo));
Route.get('/:customerId',
    requireLogin,
    requireRole('ADMIN'),
    Trycatch(customerController.getCustomerbyId))

Route.post('/', Trycatch(customerController.createCustomer));
Route.post('/upload',
    store.storeCustomer.single('customerAvatar'),
    Trycatch(customerController.uploadCustomerAvatar));
Route.post('/customerAvatar/delete',
    requireCustomerLogin,
    Trycatch(customerController.deleteCustomerAvatarByID)
)
Route.put('/:id', requireCustomerLogin, Trycatch(customerController.updateCustomerInforByID));
Route.put('/update_password/:id', requireCustomerLogin, Trycatch(customerController.updatePasswordByID))
Route.delete('/:id',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(customerController.deleteCustomer));

module.exports = Route;
