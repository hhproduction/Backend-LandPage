const Route = require('express').Router();
const districtController = require("../controller/district")
const { Trycatch } = require('../middlewares/errorHandle')
const { requireLogin, requireRole } = require('../middlewares/auth')

Route.get('/:id',
    Trycatch(districtController.getAllDistrictByProvince)
);
Route.post('/',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(districtController.createDistrict)
);
Route.put('/:id',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(districtController.updateDistrictByID)
);
Route.delete('/:id',
    requireLogin,
    requireRole("ADMIN"),
    Trycatch(districtController.deleteDistrictByID)
);
module.exports = Route