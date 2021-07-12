const { errorHandle } = require('./errorHandle')

const requireLogin = (req, res, next) => {
    if (req.headers.authorization == undefined) {
        const error = new Error('Xác thực không tồn tại')
        error.status = 401
        // next(error)
        errorHandle(error, req, res, next)
    } else {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = require('../utils/security').verifyToken(token)
        if (decodedToken.status == 401) {
            res.status(decodedToken.status)
            res.send(decodedToken)
        }
        else if (decodedToken.status == 200) {
            req.username = decodedToken.data.username,
                req.role = decodedToken.data.role,
                req.adminID = decodedToken.data.adminID
            next()
        }
        else {
            const error = new Error('Xác thực thất bại')
            error.status = 402
            errorHandle(error, req, res, next)
        }
    }
}
const requireRole = (role) => async (req, res, next) => {
    if (req.role === role) {
        next()
    } else {
        const error = new Error('Không được cấp quyền')
        error.status = 403
        errorHandle(error, req, res, next)
    }
}
const requireCustomerLogin = (req, res, next) => {
    if (req.headers.authorization == undefined) {
        const error = new Error('Xác thực không tồn tại')
        error.status = 401
        errorHandle(error, req, res, next)
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
            const error = new Error('Xác thực thất bại')
            error.status = 402
            errorHandle(error, req, res, next)
        }
    }
}
module.exports = {
    requireLogin,
    requireRole,
    requireCustomerLogin
}