const authService = require('../services/auth')
const accountService = require('../services/account')
const security = require('../utils/security')

const login = async (req, res, next) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    const result = await authService.login(user);
    if (result) {
        const compare = await security.verifyPassword(user.password, result.password)
        if (compare) {
            res.send({
                status: 1,
                token: security.generateToken({
                    username: result.username,
                    role: result.role,
                })
            })
            next()
        } else {
            res.send({
                status: 0,
                message: 'Wrong password'
            })
        }
    } else {
        res.send({
            status: 0,
            message: 'User not found'
        })
    }
}
const getMe = async (req, res, next) => {
    console.log("Me");
    const user = await accountService.getAccountbyId(req.username)
    console.log(user);
    res.send(user)
}
module.exports = {
    login,
    getMe
}
