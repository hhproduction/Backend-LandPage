const categoryService = require('../services/category');
const productService = require('../services/product');
const accountService = require('../services/account');
const orderService = require('../services/order');
const customerService = require('../services/customer');
const producerService = require('../services/producer')

const parameterCategory = async (req, res) => {
    
    const { data, metadata } = await categoryService.parameterCategory()
    res.send({
        data,
        metadata
    })
}
const parameterProduct = async (req, res) => {
    
    const { data, metadata } = await productService.parameterProduct()
    res.send({
        data,
        metadata
    })
}
const parameterAccount = async (req, res) => {
    console.log(req.pagination);
    const { data, metadata } = await accountService.parameterAccount()
    res.send({
        data,
        metadata
    })
}
const parameterOrder = async (req, res) => {
    
    const { data, metadata } = await orderService.parameterOrder()
    res.send({
        data,
        metadata
    })
}
const parameterCustomer = async (req, res) => {
    
    const { data, metadata } = await customerService.parameterCustomer()
    res.send({
        data,
        metadata
    })
}
const parameterProducer = async (req, res) => {
    
    const { data, metadata } = await producerService.parameterProducer()
    res.send({
        data,
        metadata
    })
}
module.exports = {
    parameterCategory,
    parameterAccount,
    parameterOrder,
    parameterProduct,
    parameterCustomer,
    parameterProducer
}
