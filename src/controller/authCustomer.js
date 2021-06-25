const authCustomerService = require('../services/authCustomer')
const customerService = require('../services/customer')
const security = require('../utils/security')

const login = async (req, res, next) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    const result = await authCustomerService.login(user);
    
    if (result) {

        const compareCustomer = await security.verifyPassword(user.password, result.password)

        if (compareCustomer) {
            res.send({
                status: 1,
                token: security.generateTokenCustomer({
                    username: result.username,
                    customerId: result.customerId     
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
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = security.verifyToken(token)
    const customerId = decodedToken.customerId
    const user = await customerService.getCustomerById(customerId)
    res.send(user)
}
module.exports = {
    login,
    getMe
}
