const Route = require('express').Router();
const provinceController = require("../controller/province")
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole } = require('../middlewares/auth')

Route.get('/',
    Trycatch(provinceController.getAllProvince)
);
Route.post('/',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(provinceController.createProvince)
);
Route.put('/:id',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(provinceController.updateProvinceByID)
);
Route.delete('/:id',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(provinceController.deleteProvinceByID)
);
module.exports = Route