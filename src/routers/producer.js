const Route = require('express').Router();
const producerController = require('../controller/producer')
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole } = require('../middlewares/auth')
const {store} = require('../middlewares/multer')
Route.get('/', Trycatch(producerController.getAllProducer));

Route.post('/',
    requireLogin,
    requireRole('ADMIN'),
    store.single('imageProducer'),
    Trycatch(producerController.createProducer)
)
Route.put('/:id',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(producerController.updateProducerByID)
)
Route.delete('/:id',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(producerController.deleteProducerByID)
)
module.exports = Route