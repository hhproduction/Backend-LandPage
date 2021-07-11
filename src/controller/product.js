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
    const { productID } = req.params;
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
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files');
        return { error }
    }
    // console.log(files);
    const { id } = await productService.createProduct(req.body)
    await productService.createProductImage(files, id)
    res.send({
        status: 1,
        message: "Product was created successfull",
        data: files
    })
}
const createProductVariant = async (req, res) => {
    const { productID } = req.params
    const file = req.file
    if (!file) {
        const error = new Error('Please choose files');
        return { error }
    }
    await productService.createProductVariant(req.body, file, productID)
    res.send({
        status: 1,
        message: "Product variant was created successfull",
        data: file
    })
}
const createProductComment = async (req, res) => {
    const { productID } = req.params
    await productService.createProductComment(productID, req.body)
    res.send({
        status: 1,
        message: "Product comment was created successfull"
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
const updateProductComment = async (req, res) => {
    const { productID } = req.params;
    await productService.updateProductComment(req.body, productID)
    res.send({
        status: 1,
        message: "Update product comment successful."
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
const deleteProductVariantByID = async (req, res) => {
    const { variantID } = req.params
    await productService.deleteProductVariantByID(variantID)
    res.send({
        status: 1,
        message: "Delete product variant successful."
    })
}
const deleteProductCommentByID = async (req, res) => {
    const { commentID } = req.params
    await productService.deleteProductCommentByID(commentID)
    res.send({
        status: 1,
        message: "Delete product comment successful."
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
    createProductVariant,
    createProductComment,
    // uploadMultipleProductImage,
    updateProduct,
    updateProductComment,
    getProductByCategoryID,
    getProductByCategoryIDSortedByNumberBuy,
    getProductByCategoryIDSortedByPriceASC,
    getProductByCategoryIDSortedByPriceDESC,
    getProductByCategoryIDSortedByTime,
    getProductByName,
    getProductByProducerID,
    deleteProductImage,
    deleteProductCommentByID,
    deleteProduct,
    deleteProductVariantByID
}