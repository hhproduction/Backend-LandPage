const provinceService = require('../services/province')

const getAllProvince = async (req, res) => {
    const { data } = await provinceService.getAllProvince()
    res.send({
        status: 1,
        data
    })
}
const createProvince = async (req, res) => {
    await provinceService.createProvince(req.body)
    res.send({
        status: 1,
        message:"Province was created successful."
    })
}
const updateProvinceByID = async (req, res) => {
    const { id } = req.params;
    await provinceService.updateProvinceByID(id, req.body)
    res.send({
        status: 1,
        message:"Update province successful."
    })
}
const deleteProvinceByID = async (req, res) => {
    const { id } = req.params
    await provinceService.deleteProvinceByID(id)
    res.send({
        status: 1,
        message:"Delete province successful."
    })
}
module.exports = {
    getAllProvince,
    createProvince,
    updateProvinceByID,
    deleteProvinceByID
}