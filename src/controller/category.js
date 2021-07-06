const categoryService = require('../services/category')

const getAllCategory = async (req, res) => {
  const { data } = await categoryService.getAllCategory() 
  res.send({
    status: 1,
    data
  })
}
const getAllCategoryNoTree = async (req, res) => {
  const { data } = await categoryService.getAllCategoryNoTree() 
  res.send({
    status: 1,
    data
  })
}

const getCategoryByID = async (req, res) => {
  const { id } = req.params;
  const { data } = await categoryService.getCategoryByID(id);
  res.send({
      status: 1,
      data
    })
}
const createCategory = async (req, res) => {
  await categoryService.createCategory(req.body)
  res.send({
    status: 1,
    message:"Category was created successfull."
  })
}
const updateCategoryByID = async (req, res) => {
  const { id } = req.params;
  await categoryService.updateCategoryByID(req.body, id)
  res.send({
    status: 1,// true - 1, false 0
    message:"Update category successfull."
  })
}
const deleteCategoryByID = async (req, res) => {
  const { id } = req.params;
  await categoryService.deleteCategoryByID(id)
  res.send({
    status: 1,
    message:"Delete category successfull."// true - 1, false 0
  })
}

// router => controllers => services 
module.exports = {
  getAllCategory,
  getAllCategoryNoTree,
  getCategoryByID,
  createCategory,
  updateCategoryByID,
  deleteCategoryByID
}