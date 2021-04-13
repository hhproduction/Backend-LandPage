const Route = require('express').Router();
const accountController = require('../controller/account')


// Route.get('/', accountController.getAllAccount)
Route.get('/:id', accountController.getAccountbyId)
Route.post('/', async (req, res, next) => {
    const newAccount = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
        // 123456 => hash => encrypt => result => save to db
    }
    const result = await accountController.creatAccount(newAccount)
    if (result.status) {
        res.send(result)
    } else {
        console.log('tao tai khoan that bai');
    }
})
Route.put('/:id', accountController.updateAccount)
Route.delete('/:id', accountController.deleteAccount)

module.exports = Route