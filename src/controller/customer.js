const customerService = require('../services/customer')
const fs = require('fs')
const security = require('../utils/security')
const path = require('path')
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
    const {customerId} = req.params
    const { data, avatar } = await customerService.getCustomerById(customerId)
    res.send({
        status: 1,
        data,
        avatar
    })
}

const createCustomer = async (req, res) => {
    await customerService.createCustomer(req.body)
    res.send({
        status: 1,
        message: "tao khach hang thanh cong"
    })
}
const uploadCustomerAvatar = async (req, res, next) => {
    const file = req.file;
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = security.verifyToken(token)
    const customerId = decodedToken.customerId
    if (!file) {
        const error = new Error('Please choose file')
        return next(error)
    }
    await customerService.createCustomerAvatar(file, customerId)
    res.send({
        status: 1,
        message: "upload image successfull",
        data: file
    })
}
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
    if(result.status){
        res.send({
            status: 1,
            message: "update mat khau thanh cong" 
        })
    }
    else{
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
    const dirPath = './'
    const { avatar } = req.body
    const sqlAvatar = '%' + avatar.split('\\').pop() + '%';
    await customerService.deleteCustomerAvatarByID(sqlAvatar)
    fs.unlink(path.join(dirPath, avatar), (err) => {
        if (err) {
            console.log(err)
            res.send({
                status: 0,
                msg: 'Failed to delete image.'
            })
        } else {
            res.send({
                status: 1,
                msg: 'Delete image successful.'
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
    uploadCustomerAvatar,
    deleteCustomerAvatarByID
}