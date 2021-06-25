const newsService = require('../services/news')
const fs = require('fs')
const path = require('path')
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
    await newsService.createNews(req.body)
    res.send({
        status: 1,
        message: "news was created successful."
    })
}
const uploadMultipleNewsImage = async (req, res, next) => {
    const files = req.files;
    const { id } = req.params;
    if (!files) {
        const error = new Error('Please choose files');
        return next(error)
    }
    await newsService.createNewsImage(files, id)
    res.send({
        status: 1,
        message: "upload image successfull",
        data: files
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
    const dirPath = './'
    const { image } = req.body
    const sqlImage = '%' + image.split('/').pop() + '%';
    await newsService.deleteNewsImageByID(sqlImage)
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
    getAllNews,
    getNewsById,
    createNews,
    uploadMultipleNewsImage,
    updateNews,
    deleteNews,
    deleteNewsImage
}