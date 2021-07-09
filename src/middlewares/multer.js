const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const path = require('path')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    bucket: process.env.AWS_BUCKET_NAME,
    apiVersion:env.AWS_API_VERSION
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

const store = multer({
    storage: multerS3({
        s3: s3,
        key: (req, file, cb) => {
            cb(null, path.basename(file.originalname, path.extname(file.originalname))+'-'+Date.now() +path.extname(file.originalname))
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter,
})


module.exports = {
    store,
    s3
}