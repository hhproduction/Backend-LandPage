const orderService = require('../services/order')
const security = require('../utils/security')
const getAllOrder = async (req, res) => {
    const { data, metadata } = await orderService.getAllOrder(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getGuestOrderbyPhone = async (req, res) => {
    const { phone } = req.params;
    const { data, orderDetail } = await orderService.getGuestOrderbyPhone(phone)
    res.send({
        status: 1,
        data,
        orderDetail
    })
}
const getCustomerOrderbyId = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = security.verifyToken(token)
    const customerId = decodedToken.customerId
    const { data, orderDetail } = await orderService.getCustomerOrderbyId(customerId)
    res.send({
        status: 1,
        data,
        orderDetail
    })
}
const getOrderByID = async (req, res) => {
    const {orderCode} = req.params
    const { data, orderDetail } = await orderService.getOrderByID(orderCode)
    res.send({
        status: 1,
        data,
        orderDetail
    })
}

const createGuestOrder = async (req, res) => {
    await orderService.createGuestOrder(req.body)
    res.send({
        status: 1,
        message: "Tao order thanh cong"
    })
}
const createCustomerOrder = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = security.verifyToken(token)
    const customerId = decodedToken.customerId
    await orderService.createCustomerOrder(customerId, req.body)
    res.send({
        status: 1,
        message: "Tao order thanh cong"
    })
}

const deleteOrderById = async (req, res) => {
    const { id } = req.params
    await orderService.deleteOrderbyID(id)
    res.send({
        status:1,
        message:"xoa order thanh cong"
    })

}
module.exports = {
    getAllOrder,
    getGuestOrderbyPhone,
    getCustomerOrderbyId,
    getOrderByID,
    createGuestOrder,
    createCustomerOrder,
    deleteOrderById,
}