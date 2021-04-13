const customerService = require('../services/customer')

const getAllCustomer = async (req, res) => {
    const { data, metadata } = await customerService.getAllCustomer(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getCustomerbyId = async (req, res) => {
    const { id } = req.params;
    const {data} = await customerService.getCustomerById(id)
    res.send({
        status:1,
        data
    })
}
const createCustomer = async (newCustomer)=>{
    await customerService.createCustomer(req.body)
    res.send({
        status:1,
        message: "tao khach hang thanh cong"
    })
}
const updateCustomer = async (req,res)=>{
    const {id}=req.params;
    await customerService.updateAccountbyId(id,req.body)
    res.send({
        status:1,
        message: "update thanh cong"
    })
}
const deleteCustomer = async (req,res)=>{
    const {id}=req.params
    await customerService.deleteCustomerbyId(id)
    res.send({
        status:1,
    })
}
module.exports={
    getAllCustomer,
    getCustomerbyId,
    createCustomer,
    updateCustomer,
    deleteCustomer
}