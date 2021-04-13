const db = require('../utils/db')
const security = require('../utils/security')
// const tinyUrl = require('tinyurl')
// const getAllAccount = async ({ limit, offset }) => {
//     const sql = `
//     select username, password, role, created_at, updated_at
//     from account
//     where isDelete = 0
//     limit ?
//     offset ?;
//     `
//     const data = await db.queryMulti(sql, [limit, offset])
//     const countsql = `
//     select count(username) as total from account`
//     const { total } = await db.queryOne(countsql)
//     return {
//         data,
//         metadata: {
//             length: data.length,
//             total
//         }
//     }
// }
const getAccountbyId = async (username) => {
    const sql = `
    select username, password, role, display, email, phone, address, birthday, avatar, status, created_at, updated_at 
    from account
    where isDelete = 0 and username = ?`
    const data = await db.queryOne(sql, [username])
    return {
        data
    }
}
const creatAccount = async (newAccount) => {
    const checkExistedSQL = `
     select count(username) as c from account where username=?
    `
    const exist = await db.queryOne(checkExistedSQL, [newAccount.username])
    if (exist.c > 0) {
        return "tai khoan da ton tai"
    } else {
        const sql = `
    insert into account (username, password, role )
    values(?,?,?,?,?,?,?,?,?,?)`
        // const tinyAvatar = await tinyUrl.shorten(newAccount.avatar)
        const encryptedPassword = await security.generatePassword(newAccount.password)
        await db.query(sql, [newAccount.username, encryptedPassword, newAccount.role])
        return "tao tai khoan thanh cong";
    }
}
const updateAccountbyId = async ({ password, role }) => {
    const sql = `
    update account 
    set password = ?, 
    role =?, 
    where username = ? and isDelete = 0;
    `
    await db.query(sql, [password, role])
}
const deleteAccountbyId = async (id) => {
    const sql = `update account
    set isDelete =1
    where username = ?`
    await db.query(sql, [id])
}
const parameterAccount = async () => {
    const sql = `
    select username
    from account
    where isDelete=0`
    const data = await db.queryMulti(sql);
    return {
        data,
        metadata: {
            length: data.length
        }
    }
}
module.exports = {
    deleteAccountbyId,
    updateAccountbyId,
    creatAccount,
    getAccountbyId,
    // getAllAccount,
    parameterAccount
}