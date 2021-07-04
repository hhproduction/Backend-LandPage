const producerService = require('../services/producer')
const getAllProducer = async (req, res) => {
    const { data, metadata } = await producerService.getAllProducer(req.pagination)
    res.send({
        status: 1,
        data,
        metadata
    })
}
const createProducer = async (req, res) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please choose file')
        return next(error)
    }
    await producerService.createProducer(req.body, file)
    res.send({
        status: 1,
        message: "Producer was created successful.",
        data: file
    })
}
const updateProducerByID = async (req, res) => {
    const { id } = req.params
    await producerService.updateProducerByID(req.body, id)
    res.send({
        status: 1,// true - 1, false 0
        message: "Update producer successfull."
    })
}
const deleteProducerByID = async (req, res) => {
    const { id } = rqe.params
    await producerService.deleteProducerByID(id)
    res.send({
        status: 1,// true - 1, false 0
        message: "Delete producer successfull."
    })
}
module.exports = {
    getAllProducer,
    createProducer,
    updateProducerByID,
    deleteProducerByID
}