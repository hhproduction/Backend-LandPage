const accountService = require('../services/account')
const fs = require('fs')
const security = require('../utils/security')

const getAccountbyId = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = security.verifyToken(token)
    const adminId = decodedToken.adminID
    const { data, avatar } = await accountService.getAccountbyId(adminId)
    res.send({
        status: 1,
        data,
        avatar
    })
}
// const createAccount = async (newAccount) => {
//     if (!newAccount.username) {
//         const result = {
//             status: 0,
//             message: 'Account need to be filled'
//         }
//         return result;
//     }
//     if (!newAccount.password || newAccount.password.length < 6) {
//         const result = {
//             status: 0,
//             message: 'Pass length must be greater than 6'
//         }
//         return result;
//     }

//     const result = {
//         status: 1,
//         message: await accountService.createAccount(newAccount)

//     }
//     return result;
// }
const uploadAdminAvatar = async (req, res, next) => {
    const file = req.file;
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = security.verifyToken(token)
    const adminId = decodedToken.adminID
    if (!file) {
        const error = new Error('Please choose file')
        return next(error)
    }
    await accountService.createAdminAvatar(file, adminId)
    res.send({
        status: 1,
        message: "upload image successfull",
        data: file
    })
}
const updateAccountInforByID = async (req, res) => {
    const { id } = req.params;
    await accountService.updateAccountInforByID(req.body, id)
    res.send({
        status: 1,
        message: "update tai khoan thanh cong"
    })
}
const updatePasswordByID = async (req, res) => {
    const { id } = req.params;
    const result = await accountService.updatePasswordByID(req.body, id)
    if(result.status){
        res.send({
            status: 1,
            message: "update mat khau thanh cong" 
        })
    }
    else{
        res.send({
            status: 0,
            message: "update mat khau that bai, " + result.message 
        })
    }
}
const deleteAdminAvatarByID = async (req, res) => {
    const dirPath = './'
    const { avatar } = req.body
    const sqlAvatar = '%' + avatar.split('\\').pop() + '%';
    await accountService.deleteAdminAvatarByID(sqlAvatar)
    fs.unlink(path.join(dirPath, avatar), (err) => {
        if (err) {
            console.log(err)
            res.send({
                status: 0,
                msg: 'Failed to delete image.'
            })
        } else {
            res.send({
                status: 1,
                msg: 'Delete image successful.'
            })
        }
    })
}
// const deleteAccount = async (req, res) => {
//     const { id } = req.params
//     await accountService.deleteAccountbyId(id)
//     res.send({
//         status: 1,
//         message:"xoa tai khoan thanh cong"
//     })

// }
module.exports = {
    // getAllAccount,
    getAccountbyId,
    updateAccountInforByID,
    updatePasswordByID,
    // createAccount,
    uploadAdminAvatar,
    deleteAdminAvatarByID
    // deleteAccount,
}