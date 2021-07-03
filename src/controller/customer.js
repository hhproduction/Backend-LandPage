const customerService = require('../services/customer')
const security = require('../utils/security')
const { s3 } = require('../middlewares/multer')
const getAllCustomer = async (req, res) => {
    const { data, metadata } = await customerService.getAllCustomer(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getCustomerInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = security.verifyToken(token)
    const customerId = decodedToken.customerId
    const { data, avatar } = await customerService.getCustomerInfo(customerId)
    res.send({
        status: 1,
        data,
        avatar
    })
}
const getCustomerbyId = async (req, res) => {
    const { customerId } = req.params
    const { data, avatar } = await customerService.getCustomerById(customerId)
    res.send({
        status: 1,
        data,
        avatar
    })
}

const createCustomer = async (req, res) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please choose file')
        return next(error)
    }
    const id = await customerService.createCustomer(req.body)
    await customerService.createCustomerAvatar(file.path, file.mimetype, file.size, id)
    res.send({
        status: 1,
        message: "Sign Up successful.",
        data: file
    })

}
// const uploadCustomerAvatar = async (req, res, next) => {

//     const token = req.headers.authorization.split(' ')[1]
//     const decodedToken = security.verifyToken(token)
//     const customerId = decodedToken.customerId

// }
const updateCustomerInforByID = async (req, res) => {
    const { id } = req.params;
    await customerService.updateCustomerInforByID(req.body, id)
    res.send({
        status: 1,
        message: "update thong tin khach hang thanh cong"
    })
}
const updatePasswordByID = async (req, res) => {
    const { id } = req.params;
    const result = await customerService.updatePasswordByID(req.body, id)
    if (result.status) {
        res.send({
            status: 1,
            message: "update mat khau thanh cong"
        })
    }
    else {
        res.send({
            status: 0,
            message: "update mat khau that bai, " + result.message
        })
    }
}
const deleteCustomer = async (req, res) => {
    const { id } = req.params
    await customerService.deleteCustomerbyId(id)
    res.send({
        status: 1,
    })
}
const deleteCustomerAvatarByID = async (req, res) => {
    const { avatar } = req.body
    const key = avatar.split('/').pop()
    const sqlAvatar = '%' + key + '%';
    await customerService.deleteCustomerAvatarByID(sqlAvatar)
    var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    }
    s3.deleteObject(params, (err, data) => {
        if (err) {
            res.status(499).send({
                message: err
            })
        }
        else {
            res.status(200).send({
                message: "delete image successful."
            })
        }
    })
}
module.exports = {
    getAllCustomer,
    getCustomerInfo,
    getCustomerbyId,
    createCustomer,
    updateCustomerInforByID,
    updatePasswordByID,
    deleteCustomer,
    // uploadCustomerAvatar,
    deleteCustomerAvatarByID
}