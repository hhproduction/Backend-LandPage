const orderService = require('../services/order')

const getAllOrder = async (req, res) => {
    const { data, metadata } = await orderService.getAllOrder(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getOrderbyId = async (req, res) => {
    const { id } = req.params;
    const { data } = await orderService.getOrderbyId(id)
    res.send({
        status: 1,
        data
    })
}
const createOrder = async (req, res) => {
    await orderService.creatOrder(req.body)
    res.send({
        status: 1
    })
}
const updateOrder = async (req, res) => {
    const { id } = req.params;
    await orderService.updateOrderbyID(id, req.body)
    res.send({
        status: 1,
    })
}
const deleteOrder = async (req, res) => {
    const { id } = req.params
    await orderService.deleteOrderbyID(id)
    res.send({
        status:1,
    })

}
module.exports = {
    getAllOrder,
    getOrderbyId,
    createOrder,
    updateOrder,
    deleteOrder,
}