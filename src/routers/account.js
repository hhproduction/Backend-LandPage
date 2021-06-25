const Route = require('express').Router();
const accountController = require('../controller/account')
const { requireLogin, requireRole } = require('../middlewares/auth')
const { Trycatch } = require('../middlewares/errorHandle')
const store = require('../middlewares/multer')
// Route.get('/', TryCatch(accountController.getAllAccount))
Route.get('/info',
    Trycatch(accountController.getAccountbyId)
);
// Route.post('/', async (req, res, next) => {
//     const newAccount = {
//         fullname: req.body.fullname,
//         username: req.body.username,
//         password: req.body.password,
//         role: req.body.role,
//         birth: req.body.birth,
//         email: req.body.email,
//         gender: req.body.gender,
//         phone: req.body.phone,
//         address: req.body.address
//     }
//     const result = await accountController.createAccount(newAccount)
//     if (result.status) {
//         res.send(result)
//     } else {
//         console.log('tao tai khoan that bai');
//     }
// })
Route.post('/upload',
    requireLogin,
    requireRole('ADMIN'),
    store.storeAdmin.single('adminAvatar'),
    Trycatch(accountController.uploadAdminAvatar));
Route.post('/adminAvatar/delete',
    requireLogin,
    requireRole('ADMIN'),
    Trycatch(accountController.deleteAdminAvatarByID)
);
Route.put('/:id', requireLogin, requireRole("ADMIN"), Trycatch(accountController.updateAccountInforByID))
Route.put('/update_password/:id', requireLogin, requireRole("ADMIN"), Trycatch(accountController.updatePasswordByID))


module.exports = Route