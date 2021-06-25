const productService = require('../services/product')
const fs = require('fs')
const path = require('path')
const getAllproduct = async (req, res) => {
    const { data, metadata } = await productService.getAllProduct(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getProductById = async (req, res) => {
    const { id } = req.params;
    const { data, listImage } = await productService.getProductById(id)
    res.send({
        status: 1,
        data,
        listImage
    })
}
const getProductByName = async (req, res) => {
    const { name } = req.params;
    const sqlName = '%' + name + '%'
    const { data, metadata } = await productService.getProductByName(sqlName, req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const createProduct = async (req, res) => {
    await productService.createProduct(req.body)
    res.send({
        status: 1,
        message: "Product was created successful."
    })
}
const uploadMultipleProductImage = async (req, res, next) => {
    const files = req.files;
    const { id } = req.params;
    if (!files) {
        const error = new Error('Please choose files');
        return next(error)
    }
    await productService.createProductImage(files, id)
    res.send({
        status: 1,
        message: "upload image successfull",
        data: files
    })
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    await productService.updateProductByID(req.body, id)
    res.send({
        status: 1,
        message: "Update product successful."
    })
}
const deleteProduct = async (req, res) => {
    const { id } = req.params
    await productService.deleteProductByID(id)
    res.send({
        status: 1,
        message: "Delete product successful."
    })

}
const getProductByCategoryID = async (req, res) => {
    const { categoryId } = req.params;
    const { data, metadata } = await productService.getProductByCategoryID(categoryId, req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getProductByProducerID = async (req, res) => {
    const { producerId } = req.params;
    const { data, metadata } = await productService.getProductByProducerID(producerId, req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const deleteProductImage = async (req, res) => {
    const dirPath = './'
    const { image } = req.body
    const sqlImage = '%' + image.split('/').pop() + '%';
    await productService.deleteProductImageByID(sqlImage)
    fs.unlink(path.join(dirPath, image), (err) => {
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
    getAllproduct,
    getProductById,
    createProduct,
    uploadMultipleProductImage,
    updateProduct,
    deleteProduct,
    getProductByCategoryID,
    getProductByName,
    getProductByProducerID,
    deleteProductImage
}