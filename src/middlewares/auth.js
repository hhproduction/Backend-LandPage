const db = require('../utils/db');

const requireLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = require('../utils/security').verifyToken(token)
        console.log(decodedToken);
        req.username = decodedToken.username
        req.role = decodedToken.role
        next()
    } catch (error) {
        next('xac thuc that bai')//401
    }
}
const requireRole = (role) => async (req, res, next) => {
    if (req.role === role) {
        next()
    } else {
        next('khong duoc cap quyen')//403
    }
}
module.exports = {
    requireLogin,
    requireRole
}