const newsService = require('../services/news')
const { s3 } = require('../middlewares/multer')
const getAllNews = async (req, res) => {
    const { data, metadata } = await newsService.getAllNews(req.pagination)
    res.send({
        status: 1,
        metadata,
        data
    })
}
const getNewsById = async (req, res) => {
    const { id } = req.params;
    const { data, listImage } = await newsService.getNewsById(id)
    res.send({
        status: 1,
        data,
        listImage
    })
}
const createNews = async (req, res) => {
    const files = req.files;
    if (!files) {
        const error = new Error('Please choose files');
        return next(error)
    }
    const { id } = await newsService.createNews(req.body)
    await newsService.createNewsImage(files, id)
    res.send({
        status: 1,
        message: "news was created successful.",
        data: files
    })
}
const uploadMultipleNewsImage = async (req, res, next) => {

    // const { id } = req.params;
    const files = req.files

    res.send({
        uploaded:true,
        url: files[0].location
    })
}

const updateNews = async (req, res) => {
    const { id } = req.params;
    await newsService.updateNewsByID(req.body, id)
    res.send({
        status: 1,
        message: "Update news successful."
    })
}
const deleteNews = async (req, res) => {
    const { id } = req.params
    await newsService.deleteNewsByID(id)
    res.send({
        status: 1,
        message: "Delete news successful."
    })

}

const deleteNewsImage = async (req, res) => {
    const { image } = req.body
    const key = image.split('/').pop()
    const sqlImage = '%' + key + '%';
    await newsService.deleteNewsImageByID(sqlImage)
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
    getAllNews,
    getNewsById,
    createNews,
    uploadMultipleNewsImage,
    updateNews,
    deleteNews,
    deleteNewsImage
}