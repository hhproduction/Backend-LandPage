const multer = require('multer')
const path = require('path')
const fs = require('fs')
//set storage
const DIRProduct = path.resolve(__dirname,'../uploads/product')
const DIRAdmin = path.resolve(__dirname,'../uploads/admin')
const DIRCustomer = path.resolve(__dirname,'../uploads/customer')
const DIRNews = path.resolve(__dirname,'../uploads/news')
var storageProduct = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir(DIRProduct, err => cb (err, DIRProduct))
    },
    filename: (req, file, cb) => {
        //image.jpg
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
var storageAdmin = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir(DIRAdmin, err => cb (err, DIRAdmin))
    },
    filename: (req, file, cb) => {
        //image.jpg
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
var storageCustomer = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir(DIRCustomer, err => cb (err, DIRCustomer))
    },
    filename: (req, file, cb) => {
        //image.jpg
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
var storageNews = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir(DIRNews, err => cb (err, DIRNews))
    },
    filename: (req, file, cb) => {
        //image.jpg
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(new Error('Accept jpeg and png only.'), false)
    }
}
const storeProduct = multer({
    storage: storageProduct,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter
})
const storeAdmin = multer({
    storage: storageAdmin,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter
})
const storeCustomer = multer({
    storage: storageCustomer,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter
})
const storeNews = multer({
    storage: storageNews,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter
})

module.exports = {
    storeProduct,
    storeAdmin,
    storeCustomer,
    storeNews
}