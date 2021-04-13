const productService = require('../services/product')

const getAllproduct = async (req, res) => {
    const { data, metadata } = await productService.getAllProduct(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getProductbyId = async (req, res) => {
    const { id } = req.params;
    const { data } = await productService.getProductbyID(id)
    res.send({
        status: 1,
        data
    })
}
const createProduct = async (req, res) => {
    await productService.creatProduct(req.body)
    res.send({
        status: 1
    })
}
const updateProduct = async (req, res) => {
    const { id } = req.params;
    await productService.updateProductbyID(id, req.body)
    res.send({
        status: 1,
    })
}
const deleteProduct = async (req, res) => {
    const { id } = req.params
    await productService.deleteProductbyID(id)
    res.send({
        status: 1,
    })

}
const getProductbyCategoryID = async (req, res) => {
    const { categoryId } = req.params;
    const { data, metadata } = await productService.getProductbyCategorybyID(categoryId,req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
module.exports = {
    getAllproduct,
    getProductbyId,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductbyCategoryID
}