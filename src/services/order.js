const db = require('../utils/db')
//Guest co status = 0
const getAllGuestOrder = async ({ limit, offset }) => {
    const sql = `
    select CONCAT(db_order.prefix,db_order.orderCode) as orderID, db_order.orderdate, db_order.fullname, db_order.phone, db_order.money, db_province.\`name\` as province, db_district.\`name\` as district, db_order.address, db_order.payment, db_order.note, db_order.created_at, db_order.modified_at, db_order.\`status\`
    from db_order
    inner join db_province on db_province.id = db_order.province
    inner join db_district on db_district.id = db_order.district
    where db_order.trash = 0 and db_order.\`status\` = 0
    limit  ?
    offset  ?
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(orderCode) as total from db_order where \`status\` = 0;
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
//customer co status = 1
const getAllCustomerOrder = async ({limit, offset})=>{
    const sql=`
    select CONCAT(db_order.prefix,db_order.orderCode) as orderID,db_order.customerid, db_order.orderdate, db_customer.fullname, db_customer.phone, db_order.money,db_province.\`name\` as province, db_district.\`name\` as district, db_customer.address, db_order.payment, db_order.note, db_order.created_at, db_order.modified_at, db_order.\`status\`
    from db_order
    inner join db_customer on db_customer.id = db_order.customerid
    inner join db_province on db_province.id = db_customer.province
    inner join db_district on db_district.id = db_customer.district
    where db_order.trash  = 0 and db_order.\`status\` = 1
    limit  ?
    offset  ?;
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(orderCode) as total from db_order where   \`status\` = 1;
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
const getGuestOrderbyPhone = async (id) => {
    const sql = `
    select CONCAT(db_order.prefix,db_order.orderCode) as orderID, db_order.orderdate, db_order.fullname, db_order.phone, db_order.money, db_province.\`name\` as province, db_district.\`name\` as district, db_order.address, db_order.payment, db_order.note, db_order.created_at, db_order.modified_at, db_order.\`status\`
    from db_order
    inner join db_province on db_province.id = db_order.province
    inner join db_district on db_district.id = db_order.district
    where db_order.trash = 0 and db_order.\`status\` = 0 and db_order.phone = ?;
    `
    const sqlOrderCode = `
    select orderCode
    from db_order
    where phone = ? and trash = 0 and \`status\` = 0;
    `
    const orderCode = await db.queryOne(sqlOrderCode, id)
    const sqlOrderDetail = `
    select db_orderdetail.id, db_orderdetail.orderid, db_product.\`name\`,db_product_image.image, db_product.price, db_product.instock, db_orderdetail.quantity, db_orderdetail.price as totalPrice, db_orderdetail.note
    from db_orderdetail
    inner join db_product on db_product.id = db_orderdetail.productid
    inner join db_product_image on db_product_image.productID = db_orderdetail.productid
    where db_orderdetail.trash = 0 and db_orderdetail.orderid = ?
    group by db_orderdetail.productid;
    `
    const data = await db.queryOne(sql, [id])
    const orderDetail = await db.queryMulti(sqlOrderDetail, orderCode.orderCode)
    return {
        data,
        orderDetail
    }
}
const getCustomerOrderbyId = async (id) => {
    const sql = `
    select CONCAT(db_order.prefix,db_order.orderCode) as orderID,db_order.customerid, db_order.orderdate, db_customer.fullname, db_customer.phone, db_order.money,db_province.\`name\` as province, db_district.\`name\` as district, db_customer.address, db_order.payment, db_order.note, db_order.created_at, db_order.modified_at, db_order.\`status\`
    from db_order
    inner join db_customer on db_customer.id = db_order.customerid
    inner join db_province on db_province.id = db_customer.province
    inner join db_district on db_district.id = db_customer.district
    where db_order.trash  = 0 and db_order.\`status\` = 1 and db_order.customerid = ?;
    `
    const sqlOrderCode = `
    select orderCode
    from db_order
    where customerid = ? and trash = 0 and \`status\` = 1;
    `
    const orderCode = await db.queryOne(sqlOrderCode, id)
    const sqlOrderDetail = `
    select db_orderdetail.id, db_orderdetail.orderid, db_product.\`name\`,db_product_image.image, db_product.price, db_product.instock, db_orderdetail.quantity, db_orderdetail.price as totalPrice, db_orderdetail.note
    from db_orderdetail
    inner join db_product on db_product.id = db_orderdetail.productid
    inner join db_product_image on db_product_image.productID = db_orderdetail.productid
    where db_orderdetail.trash = 0 and db_orderdetail.orderid = ?
    group by db_orderdetail.productid;
    `
    const data = await db.queryOne(sql, [id])
    const orderDetail = await db.queryMulti(sqlOrderDetail, orderCode.orderCode)
    return {
        data,
        orderDetail
    }
}
const getCustomerOrderInfo = async (customerId) => {
    const sql = `
    select CONCAT(db_order.prefix,db_order.orderCode) as orderID,db_order.customerid, db_order.orderdate, db_customer.fullname, db_customer.phone, db_order.money,db_province.\`name\` as province, db_district.\`name\` as district, db_customer.address, db_order.payment, db_order.note, db_order.created_at, db_order.modified_at, db_order.\`status\`
    from db_order
    inner join db_customer on db_customer.id = db_order.customerid
    inner join db_province on db_province.id = db_customer.province
    inner join db_district on db_district.id = db_customer.district
    where db_order.trash  = 0 and db_order.\`status\` = 1 and db_order.customerid = ?;
    `
    const sqlOrderCode = `
    select orderCode
    from db_order
    where customerid = ? and trash = 0 and \`status\` = 1;
    `
    const orderCode = await db.queryOne(sqlOrderCode, customerId)
    const sqlOrderDetail = `
    select db_orderdetail.id, db_orderdetail.orderid, db_product.\`name\`,db_product_image.image, db_product.price, db_product.instock, db_orderdetail.quantity, db_orderdetail.price as totalPrice, db_orderdetail.note
    from db_orderdetail
    inner join db_product on db_product.id = db_orderdetail.productid
    inner join db_product_image on db_product_image.productID = db_orderdetail.productid
    where db_orderdetail.trash = 0 and db_orderdetail.orderid = ?
    group by db_orderdetail.productid;
    `
    const data = await db.queryOne(sql, [customerId])
    const orderDetail = await db.queryMulti(sqlOrderDetail, orderCode.orderCode)
    return {
        data,
        orderDetail
    }
}
const createGuestOrder = async ({  orderdate, fullname, phone, money, province, district, address, payment, note }) => {
    const sql = `
    insert into db_order(customerid,orderdate,fullname,phone, money, province, district, address, payment, note, \`status\`)
    values(null,?,?,?,?,?,?,?,?,?,?);
    `
    const statusOrder = 0;
    await db.query(sql, [ orderdate, fullname, phone, money, province, district, address, payment, note, statusOrder])
}
const createCustomerOrder = async (customerid,{ orderdate, money, payment, note }) => {
    const sql = `
    insert into db_order(customerid,orderdate,fullname,phone, money, province, district, address, payment, note)
    values(?,?,null,null,?,null,null,null,?,?);
    `
    await db.query(sql, [ customerid, orderdate, money, payment, note])
}
const updateGuestOrderById = async ({ orderdate, fullname, phone, province, district, address, payment, note }, id) => {
    const totalMoney = `
    select SUM(price) as money 
    from db_orderdetail
    where trash = 0 and orderid = ?
    `
    const money = db.queryOne(totalMoney,[id])
    const sql = `
    update db_order
    set orderdate=?,
    fullname = ?,
    phone = ?,
    money = ?,
    province = ?,
    district = ?,
    address = ?,
    payment = ?,
    note=?
    where orderCode = ? and trash = 0 and \`status\`=0;
    `
    await db.query(sql, [orderdate, fullname, phone, money, province, district, address, payment, note, id])
}
const updateCustomerOrderById = async ({ orderdate, payment, note }, id) => {
    const sqlTotalMoney = `
    select SUM(price) as money 
    from db_orderdetail
    where trash = 0 and orderid = ?;
    `
    const sql = `
    update db_order
    set orderdate=?,
    money = ?,
    payment = ?,
    note=?
    where orderCode = ? and trash = 0 and \`status\` = 1
    `
    const {money} = await db.queryOne(sqlTotalMoney,[id])
    
    await db.query(sql, [orderdate, money, payment, note, id])
}
const deleteOrderById = async (id) => {
    const sql = `update db_order
    set trash =1
    where orderCode = ?;
    `
    await db.query(sql, [id])
}
const parameterOrder = async () => {
    const sql = `
    select orderCode
    from db_order
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
    getAllGuestOrder,
    getAllCustomerOrder,
    getGuestOrderbyPhone,
    getCustomerOrderbyId,
    getCustomerOrderInfo,
    createGuestOrder,
    createCustomerOrder,
    updateGuestOrderById,
    updateCustomerOrderById,
    deleteOrderById,
    parameterOrder,
}