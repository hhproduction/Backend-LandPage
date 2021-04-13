const orderDetailService = require('../services/orderDetail');
const getAllOrderDetail = async (req, res) => {
    const { data, metadata } = await orderDetailService.getAllOrderDetail(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getOrderDetailbyId = async (req, res) => {
    const { id } = req.params;
    const { data } = await orderDetailService.getOrderDetailbyId(id)
    res.send({
        status: 1,
        data
    })
}
const createOrderDetail = async (req, res) => {
    await orderDetailService.createOrderDetail(req.body)
    res.send({
        status: 1,
        message: "tao orderDetail thanh cong"
    })
}
const updateOrderDetail = async (req, res) => {
    const { id } = req.params;
    await orderDetailService.updateOrderDetail(id,req.body)
    res.send({
        status:1,
        message:"update thanh cong orderDetail"
    })
}
const deleteOrderDetail = async (req,res) =>{
    const{id}=req.params
    await orderDetailService.deleteOrderDetail(id)
    res.send({
        status:1,
        message:"xoa thanh cong orderDetail"
    })
}
module.exports = {
    getAllOrderDetail,
    getOrderDetailbyId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
}