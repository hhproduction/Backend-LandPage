const Route = require('express').Router();
const accountController = require('../controller/account')
const { requireLogin, requireRole } = require('../middlewares/auth')
const { Trycatch } = require('../middlewares/errorHandle')
// const {store} = require('../middlewares/multer')
// Route.get('/', TryCatch(accountController.getAllAccount))
Route.get('/info',
    requireLogin,
    requireRole('ADMIN'),
    Trycatch(accountController.getAccountbyId)
);

Route.post('/adminAvatar/delete',
    requireLogin,
    requireRole('ADMIN'),
    Trycatch(accountController.deleteAdminAvatarByID)
);
Route.put('/:id', requireLogin, requireRole("ADMIN"), Trycatch(accountController.updateAccountInforByID))
Route.put('/update_password/:id', requireLogin, requireRole("ADMIN"), Trycatch(accountController.updatePasswordByID))


module.exports = Route