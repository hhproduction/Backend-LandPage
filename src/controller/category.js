const categoryService = require('../services/category')

const getAllCategory = async (req, res) => {
  console.log(req.query);
  const { data, metadata } = await categoryService.getAll(req.pagination) 
  res.send({
    status: 1,
    data,
    metadata,
  })
}

const getCategorybyId = async (req, res) => {
  const { id } = req.params;
  const { data } = await categoryService.getById(id);
  res.send({
      status: 1,
      data
    })
}
const createCategory = async (req, res) => {
  await categoryService.create(req.body)
  res.send({
    status: 1,
  })
}
const updateCategorybyId = async (req, res) => {
  const { id } = req.params;
  await categoryService.updateById(id, req.body)
  res.send({
    status: 1,// true - 1, false 0
  })
}
const deleteCategorybyId = async (req, res) => {
  const { id } = req.params;
  await categoryService.deleteById(id)
  res.send({
    status: 1,// true - 1, false 0
  })
}

// router => controllers => services 
module.exports = {
  getAllCategory,
  getCategorybyId,
  createCategory,
  updateCategorybyId,
  deleteCategorybyId
}