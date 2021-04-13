const db = require('../utils/db')
// const security = require('../utils/security')
const getAllCustomer = async ({ limit, offset }) => {
        const sql = `
        select customerId,customerName,customerGender,customerBirth,customerNation,customerAddress,customerZip, customerCity,customerPhone, customerEmail, created_at, updated_at
	    from customer
        where isDelete=0;
        limit ?
        offset ?;
        `
        const data = await db.queryMulti(sql, [limit, offset])
        const countsql = `
        select count(customerName) as total from customer`
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
    select customerId,customerName,customerGender,customerBirth,customerNation,customerAddress,customerZip, customerCity,customerPhone, customerEmail, created_at, updated_at
	from customer
    where isDelete=0 and customerId = ?`
    const data = await db.queryOne(sql, [customerId])
    return {
        data
    }
}
const createCustomer = async (newCustomer) => {
    
    const sql = `
    insert into customer (customerId, customerName,customerGender,customerBirth, customerNation,customerAddress,customerZip,customerCity,customerPhone,customerEmail )
    values(uuid,?,?,?,?,?,?,?)`
    await db.query(sql, [newCustomer.customerId,newCustomer.customerName,newCustomer.customerGender,newCustomer.customerBirth,newCustomer.customerNation,newCustomer.customerAddress,newCustomer.customerZip,newCustomer.customerCity,newCustomer.customerPhone,newCustomer.customerEmail])
    return "tao khach hang thanh cong";
    
}
const updateAccountbyId = async ({ password, role }) => {
    const sql = `
    update customer 
    set  customerName = ?, 
    customerGender = ?,
    customerBirth = ?,
    customerNation =?, 
    customerAddress =?,
    customerZip =?,
    customerCity =?,
    customerPhone =?,
    customerEmail =?    
    where username = ? and isDelete = 0;
    `
    await db.query(sql, [password, role])
}
const deleteCustomerbyId = async (id) => {
    const sql = `update account
    set isDelete =1
    where username = ?`
    await db.query(sql, [id])
}
const parameterCustomer = async () => {
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
    deleteCustomerbyId,
    updateAccountbyId,
    createCustomer,
    getAllCustomer,
    getCustomerById,
    parameterCustomer
}