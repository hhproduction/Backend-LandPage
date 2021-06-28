

const requireLogin = (req, res, next) => {
    if (req.headers.authorization == undefined) {
        next('Xác thực không tồn tại')
    } else {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = require('../utils/security').verifyToken(token)
        if (decodedToken.status == 401) {
            res.send(decodedToken)
        }
        else if (decodedToken.status == 200) {
            req.username = decodedToken.data.username,
            req.role = decodedToken.data.role,
            req.adminID = decodedToken.data.adminID
            next()
        }
        else {
            next('Xác thực thất bại')//402
        }
    }
}
const requireRole = (role) => async (req, res, next) => {
    if (req.role === role) {
        next()
    } else {
        next('khong duoc cap quyen')//403
    }
}
const requireCustomerLogin = (req, res, next) => {
    if (req.headers.authorization == undefined) {
        next('Xác thực không tồn tại')
    } else {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = require('../utils/security').verifyToken(token)
        if (decodedToken.status == 401) {
            res.send(decodedToken)
        }
        else if (decodedToken.status == 200) {
            req.username = decodedToken.data.username,
            req.customerId = decodedToken.data.customerId
            next()
        }
        else {
            next('Xác thực thất bại')//402
        }
    }
}
module.exports = {
    requireLogin,
    requireRole,
    requireCustomerLogin
}