const districtService = require('../services/district')

const getAllDistrictByProvince = async (req, res) => {
    const { id } = req.params
    const { data } = await districtService.getAllDistrictByProvince(id)
    res.send({
        status: 1,
        data
    })
}
const createDistrict = async (req, res) => {
    await districtService.createDistrict(req.body)
    res.send({
        status: 1,
        message:"District was created successful."
    })
}
const updateDistrictByID = async (req, res) => {
    const { id } = req.params;
    await districtService.updateDistrictByID( req.body, id)
    res.send({
        status: 1,
        message:"Update district successful."
    })
}
const deleteDistrictByID = async (req, res) => {
    const { id } = req.params
    await districtService.deleteDistrictByID(id)
    res.send({
        status: 1,
        message:"Delete district successful."
    })
}
module.exports = {
    getAllDistrictByProvince,
    createDistrict,
    updateDistrictByID,
    deleteDistrictByID
}