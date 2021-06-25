const orderService = require('../services/order')
const security = require('../utils/security')
const getAllGuestOrder = async (req, res) => {
    const { data, metadata } = await orderService.getAllGuestOrder(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getAllCustomerOrder = async (req, res) => {
    const { data, metadata } = await orderService.getAllCustomerOrder(req.pagination)
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
    const { id } = req.params;
    const { data, orderDetail } = await orderService.getCustomerOrderbyId(id)
    res.send({
        status: 1,
        data,
        orderDetail
    })
}
const getCustomerOrderInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = security.verifyToken(token)
    const customerId = decodedToken.customerId
    const { data, orderDetail } = await orderService.getCustomerOrderInfo(customerId)
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
const updateGuestOrderById = async (req, res) => {
    const { id } = req.params;
    await orderService.updateGuestOrderById(req.body, id)
    res.send({
        status: 1,
        message:"update order thanh cong"
    })
}
const updateCustomerOrderById = async (req, res) => {
    const { id } = req.params;
    await orderService.updateCustomerOrderById(req.body, id)
    res.send({
        status: 1,
        message:"update order thanh cong"
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
    getAllGuestOrder,
    getAllCustomerOrder,
    getGuestOrderbyPhone,
    getCustomerOrderbyId,
    getCustomerOrderInfo,
    createGuestOrder,
    createCustomerOrder,
    updateGuestOrderById,
    updateCustomerOrderById,
    deleteOrderById,
}