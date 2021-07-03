const db = require('../utils/db')
const security = require('../utils/security')
const getAllCustomer = async ({ limit, offset }) => {
    const sql = `
    select db_customer.id, db_customer.fullname, db_customer.username, db_customer.gender, db_customer.created_at, db_customer.modified_at, db_customer.\`status\`
	from db_customer
    where db_customer.trash = 0 
    limit ?
    offset ?;
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
        select count(id) as total from db_customer;
        `
    const { total } = await db.queryOne(countsql)
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getCustomerById = async (customerId) => {
    const sql = `
    select db_customer.id, db_customer.fullname, db_customer.username, db_customer.birth, db_customer.gender, db_province.\`name\` as province, db_district.\`name\` as district, db_customer.address, db_customer.phone, db_customer.email, db_customer.created_at, db_customer.modified_at, db_customer.\`status\`
	from db_customer
    inner join db_province on db_province.id = db_customer.province
    inner join db_district on db_district.id = db_customer.district
    where db_customer.trash=0 and db_customer.id = ?;
    `
    const sqlAvatar = `
    select db_customer_avatar.avatar
    from db_customer_avatar
    inner join db_customer on db_customer.id = db_customer_avatar.customerID
    where db_customer_avatar.customerID = ?
    `
    const data = await db.queryOne(sql, [customerId])
    const avatar = await db.queryOne(sqlAvatar, [customerId])
    return {
        data,
        avatar
    }
}
const getCustomerInfo = async (customerId) => {
    const sql = `
    select db_customer.id, db_customer.fullname, db_customer.username, db_customer.birth, db_customer.gender, db_province.\`name\` as province, db_district.\`name\` as district, db_customer.address, db_customer.phone, db_customer.email, db_customer.created_at, db_customer.modified_at, db_customer.\`status\`
	from db_customer
    inner join db_province on db_province.id = db_customer.province
    inner join db_district on db_district.id = db_customer.district
    where db_customer.trash=0 and db_customer.id = ?;
    `
    const sqlAvatar = `
    select db_customer_avatar.avatar
    from db_customer_avatar
    inner join db_customer on db_customer.id = db_customer_avatar.customerID
    where db_customer_avatar.customerID = ?
    `
    const data = await db.queryOne(sql, [customerId])
    const avatar = await db.queryOne(sqlAvatar, [customerId])
    return {
        data,
        avatar
    }
}
const createCustomer = async ({ fullname, username, password, birth, gender, province, district, address, phone, email }) => {
    const checkExistedSQL = `
    select count(username) as c from db_customer where username = ?
    `
    const exist = await db.queryOne(checkExistedSQL, [username])
    if (exist.c > 0) {
        return {
            status: 0,
            message: "The account is exist."
        }
    } else {
        const sql = `
        insert into db_customer (id, fullname, username, \`password\`, birth, gender, province, district, address, phone, email  )
        values(uuid(),?,?,?,?,?,?,?,?,?,?);
        `
        const sqlID=`
        select id
        from db_customer
        where username = ?
        `
        const encryptedPassword = await security.generatePassword(password)
        await db.query(sql, [fullname, username, encryptedPassword, birth, gender, province, district, address, phone, email])
        const {id} = await db.queryOne(sqlID,username)
        return {
            id
        }
    }

}
const createCustomerAvatar = async (path, mimetype, size, id) => {
    const sql = `
    insert into db_customer_avatar (\`id\`,\`customerID\`, \`avatar\`,\`type\`,\`size\`) values 
    (uuid(),?,?,?,?)
    `
    await db.query(sql, [id, path, mimetype, size])
}
const updateCustomerInforByID = async ({ fullname, username, avatar, birth, gender, province, district, address, phone, email, status, id }) => {
    const sql = `
    update db_customer 
    set  fullname = ?, 
    username = ?,
    avatar = ?,
    birth =?,
    gender=?, 
    province =?,
    district =?,
    address =?,
    phone =?,
    email =? ,
    status = ?   
    where id = ? and trash = 0;
    `
    await db.query(sql, [fullname, username, avatar, birth, gender, province, district, address, phone, email, status, id])
}
const updatePasswordByID = async ({ oldPassword, newPassword }, id) => {
    const sqlPassword = `
    select \`password\` 
    from db_customer
    where id = ?
    `
    const result = await db.queryOne(sqlPassword, [id])
    const comparePass = await security.verifyPassword(oldPassword, result.password)
    if (comparePass) {
        const sql = `
        update db_customer
        set \`password\`=?
        where id = ? and trash = 0;
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
const deleteCustomerbyId = async (id) => {
    const sql = `update db_customer
    set trash =1
    where id = ?`
    await db.query(sql, [id])
}
const deleteCustomerAvatarByID = async (id) => {
    const sql = `
    delete from db_customer_avatar where avatar like ?;
    `
    await db.query(sql, [id])
}
const parameterCustomer = async () => {
    const sql = `
    select id,\`fullname\`
    from db_customer
    where trash=0;
    `
    const data = await db.queryMulti(sql);
    return {
        data,
        metadata: {
            length: data.length
        }
    }
}
module.exports = {
    deleteCustomerbyId,
    updateCustomerInforByID,
    updatePasswordByID,
    createCustomer,
    getAllCustomer,
    getCustomerById,
    getCustomerInfo,
    parameterCustomer,
    createCustomerAvatar,
    deleteCustomerAvatarByID
}