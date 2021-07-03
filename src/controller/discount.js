const discountService = require('../services/discount')

const getAllDiscount = async (req, res) => {
    const { data, metadata } = await discountService.getAllDiscount(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getDisCountByProduct = async (req, res) => {
    const { productID } = req.params
    const { data } = await discountService.getDisCountByProduct(productID)
    res.send({
        status: 1,
        data
    })
}
const createDiscount = async (req, res) => {
    await discountService.createDiscount(req.body)
    res.send({
        status: 1,
        message: "Discount was created successful."
    })
}
const updateDiscountByID = async (req, res) => {
    const {id} = req.params
    await discountService.updateDiscountByID(req.body,id);
    res.send({
        status:1,
        message:"Discount was updated successful."
    })
}
const deleteDiscountByID = async(req,res)=>{
    const {id}=req.params
    await discountService.deleteDiscountByID(id)
    res.send({
        status:1,
        message:"Discount was deleted successful."
    })
}
module.exports={
    getAllDiscount,
    getDisCountByProduct,
    createDiscount,
    updateDiscountByID,
    deleteDiscountByID
}