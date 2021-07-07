const productService = require('../services/product')
const { s3 } = require('../middlewares/multer')
const getAllproduct = async (req, res) => {
    const { data, metadata } = await productService.getAllProduct(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getAllProductSortedByNumberBuy = async (req, res) => {
    const { data, metadata } = await productService.getAllProductSortedByNumberBuy(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getAllProductSortedByPriceASC = async (req, res) => {
    const { data, metadata } = await productService.getAllProductSortedByPriceASC(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getAllProductSortedByPriceDESC = async (req, res) => {
    const { data, metadata } = await productService.getAllProductSortedByPriceDESC(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getAllProductSortedByTime = async (req, res) => {
    const { data, metadata } = await productService.getAllProductSortedByTime(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getRelatedProduct = async (req, res) => {
    const productID = req.params;
    const { data, metadata } = await productService.getRelatedProduct(req.pagination, productID)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getProductById = async (req, res) => {
    const { id } = req.params;
    const { data } = await productService.getProductById(id)
    res.send({
        status: 1,
        data
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
    const files = req.files;
    if (!files) {
        const error = new Error('Please choose files');
        return next(error)
    }
    console.log(files);
    const {id} = await productService.createProduct(req.body)
    await productService.createProductImage(files, id)
    res.send({
        status: 1,
        message: "Product was created successfull",
        data: files
    })
}
// const uploadMultipleProductImage = async (req, res, next) => {
    
// }

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
const getProductByCategoryIDSortedByNumberBuy = async (req, res) => {
    const { categoryId } = req.params;
    const { data, metadata } = await productService.getProductByCategoryIDSortedByNumberBuy(categoryId, req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getProductByCategoryIDSortedByPriceASC = async (req, res) => {
    const { categoryId } = req.params;
    const { data, metadata } = await productService.getProductByCategoryIDSortedByPriceASC(categoryId, req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getProductByCategoryIDSortedByPriceDESC = async (req, res) => {
    const { categoryId } = req.params;
    const { data, metadata } = await productService.getProductByCategoryIDSortedByPriceDESC(categoryId, req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getProductByCategoryIDSortedByTime = async (req, res) => {
    const { categoryId } = req.params;
    const { data, metadata } = await productService.getProductByCategoryIDSortedByTime(categoryId, req.pagination)
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
    const { image } = req.body
    const key = image.split('/').pop()
    const sqlImage = '%' + key + '%';
    await productService.deleteProductImageByID(sqlImage)
    var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    }
    s3.deleteObject(params, (err, data) => {
        if (err) {
            res.status(499).send({
                message: err
            })
        }
        else {
            res.status(200).send({
                message: "delete image successful."
            })
        }
    })
}

module.exports = {
    getAllproduct,
    getAllProductSortedByNumberBuy,
    getAllProductSortedByPriceASC,
    getAllProductSortedByPriceDESC,
    getAllProductSortedByTime,
    getRelatedProduct,
    getProductById,
    createProduct,
    // uploadMultipleProductImage,
    updateProduct,
    deleteProduct,
    getProductByCategoryID,
    getProductByCategoryIDSortedByNumberBuy,
    getProductByCategoryIDSortedByPriceASC,
    getProductByCategoryIDSortedByPriceDESC,
    getProductByCategoryIDSortedByTime,
    getProductByName,
    getProductByProducerID,
    deleteProductImage
}