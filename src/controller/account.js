const accountService = require('../services/account')

// const getAllAccount = async (req, res) => {
//     const { data, metadata } = await accountService.getAllAccount(req.pagination)
//     res.send({
//         status: 1,
//         metadata,
//         data
//     })
// }
const getAccountbyId = async (req, res) => {
    const { id } = req.params;
    const { data } = await accountService.getAccountbyId(id)
    res.send({
        status: 1,
        data
    })
}
const creatAccount = async (newAccount) => {
    if (!newAccount.username) {
        const result = {
            status: 0,
            message: 'khong dc de trong tai khoan'
        }
        return result;
    }
    if (!newAccount.password || newAccount.password.length < 6) {
        const result = {
            status: 0,
            message: 'mat khau phai co do dai lon hon 6'
        }
        return result;
    }

    const result = {
        status: 1,
        message:  await accountService.creatAccount(newAccount)

    }
    return result;


    //     res.send({
    //         status: 1,
    //         tao_moi_tai_khoan: newAccount,
    //     })
}
const updateAccount = async (req, res) => {
    const { id } = req.params;
    await accountService.updateAccountbyId(id, req.body)
    res.send({
        status: 1,
    })
}
const deleteAccount = async (req, res) => {
    const { id } = req.params
    await accountService.deleteAccountbyId(id)
    res.send({
        status: 1,
    })

}
module.exports = {
    // getAllAccount,
    getAccountbyId,
    creatAccount,
    updateAccount,
    deleteAccount,
}