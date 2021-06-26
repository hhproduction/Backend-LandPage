const db = require('../utils/db')
const security = require('../utils/security')
// const tinyUrl = require('tinyurl')
// const getAllAccount = async ({ limit, offset }) => {
//     const sql = `
//     select id, fullname, username, password, role, email, gender, phone, address, img, created, \`status\` 
//     from db_admin
//     where trash = 0
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
const getAccountbyId = async (id) => {
    const sql = `
    select id, fullname, username, role, birth, email, gender, phone, address, created_at, \`status\`
    from db_admin
    where trash = 0 and id = ?
    `
    const sqlAvatar = `
    select db_admin_avatar.avatar
    from db_admin_avatar
    inner join db_admin on db_admin.id = db_admin_avatar.adminID
    where db_admin_avatar.adminID = ?
    `
    const data = await db.queryOne(sql, [id])
    const avatar = await db.queryOne(sqlAvatar, [id])
    return {
        data,
        avatar
    }
}
// const createAccount = async (newAccount) => {
//     const checkExistedSQL = `
//      select count(username) as c from db_admin where username=?
//     `
//     const exist = await db.queryOne(checkExistedSQL, [newAccount.username])
//     if (exist.c > 0) {
//         return {
//             status: 0,
//             message: "The account is exist."
//         }
//     } else {
//         const sql = `
//     insert into db_admin (id, fullname, username, \`password\`, role, birth, email, gender, phone, address )
//     values(uuid(),?,?,?,?,?,?,?,?,?)`
//         // const tinyAvatar = await tinyUrl.shorten(newAccount.avatar)
//         const encryptedPassword = await security.generatePassword(newAccount.password)
//         await db.query(sql, [newAccount.fullname, newAccount.username, encryptedPassword, newAccount.role, newAccount.birth, newAccount.email, newAccount.gender, newAccount.phone, newAccount.address])
//         return {
//             status: 1,
//             message: "The account is sign up successfull."
//         }
//     }
// }
const createAdminAvatar = async (path, mimetype, size, id) => {
    const sql = `
    insert into db_admin_avatar (\`id\`,\`adminID\`, \`avatar\`,\`type\`,\`size\`) values 
    (uuid(),?,?,?,?)
    `
    await db.query(sql, [id, path, mimetype, size])
}
const updateAccountInforByID = async ({ fullname, username, role, birth, email, gender, phone, address, status }, id) => {
    const sql = `
    update db_admin 
    set fullname=?,
    username = ?,
    role = ?,
    birth = ?,
    email =?,
    gender=?,
    phone=?,
    address=?,
    status =?
    where id = ? and trash = 0;
    `
    await db.query(sql, [fullname, username, role, birth, email, gender, phone, address, status, id])
}
const updatePasswordByID = async ({ oldPassword, newPassword }, id) => {
    const sqlPassword = `
    select \`password\` 
    from db_admin
    where id = ?
    `
    const result = await db.queryOne(sqlPassword, [id])
    const comparePass = await security.verifyPassword(oldPassword, result.password)
    if (comparePass) {
        const sql = `
        update db_admin
        set \`password\` = ?
        where id = ? and trash =0;
        `
        const encryptedPassword = await security.generatePassword(newPassword)
        await db.query(sql, [encryptedPassword, id])
        return {
            status: 1
        }
    }
    else {
        return {
            status: 0,
            message: "Wrong old password."
        }
    }

}
// const deleteAccountbyId = async (id) => {
//     const sql = `update account
//     set isDelete =1
//     where username = ?`
//     await db.query(sql, [id])
// }
const parameterAccount = async () => {
    const sql = `
    select id, username
    from db_admin
    where trash=0`
    const data = await db.queryMulti(sql);
    return {
        data,
        metadata: {
            length: data.length
        }
    }
}
const deleteAdminAvatarByID = async (id) => {
    const sql = `
    delete from db_admin_avatar where avatar like ?;
    `
    await db.query(sql, [id])
}
module.exports = {
    // deleteAccountbyId,
    updateAccountInforByID,
    updatePasswordByID,
    // createAccount,
    getAccountbyId,
    createAdminAvatar,
    deleteAdminAvatarByID,
    // getAllAccount,
    parameterAccount
}