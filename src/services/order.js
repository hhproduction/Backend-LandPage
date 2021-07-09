const db = require('../utils/db')
//Guest co status = 0
const getAllOrder = async ({ limit, offset }) => {
    const sql = `
    select CONCAT(db_order.prefix,db_order.orderCode) as orderID, db_order.totalPrice, db_order.created_at as orderDate, db_order.\`status\`
    from db_order
    inner join db_province on db_province.id = db_order.province
    inner join db_district on db_district.id = db_order.district
    where db_order.trash = 0 
    limit  ?
    offset  ?
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(orderCode) as total from db_order
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
    select CONCAT(db_order.prefix,db_order.orderCode) as orderID,db_order.customerid, db_order.fullname, db_order.phone, db_order.totalPrice,db_province.\`name\` as province, db_district.\`name\` as district, db_order.address, db_order.payment, db_order.note, db_order.created_at, db_order.modified_at, db_order.\`status\`, db_order.isCustomer
    from db_order
    inner join db_province on db_province.id = db_order.province
    inner join db_district on db_district.id = db_order.district
    where db_order.trash = 0 and db_order.\`isCustomer\` = 0 and db_order.phone = ?;
    `
    const sqlOrderCode = `
    select orderCode
    from db_order
    where phone = ? and trash = 0 and \`isCustomer\` = 0;
    `
    const orderCode = await db.queryOne(sqlOrderCode, id)
    const sqlOrderDetail = `
    select db_orderdetail.id, db_orderdetail.orderid, db_product.\`name\`,db_product_image.image, db_product.price, db_product.instock, db_orderdetail.quantity, db_orderdetail.price as totalDetailPrice
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
    select CONCAT(db_order.prefix,db_order.orderCode) as orderID,db_order.customerid, db_customer.fullname, db_customer.phone, db_order.totalPrice,db_province.\`name\` as province, db_district.\`name\` as district, db_customer.address, db_order.payment, db_order.note, db_order.created_at, db_order.modified_at, db_order.\`status\`, db_order.isCustomer
    from db_order
    inner join db_customer on db_customer.id = db_order.customerid
    inner join db_province on db_province.id = db_customer.province
    inner join db_district on db_district.id = db_customer.district
    where db_order.trash  = 0 and db_order.\`isCustomer\` = 1 and db_order.customerid = ?;
    `
    const sqlOrderCode = `
    select orderCode
    from db_order
    where customerid = ? and trash = 0 and \`status\` = 1;
    `
    const orderCode = await db.queryOne(sqlOrderCode, id)
    const sqlOrderDetail = `
    select db_orderdetail.id, db_orderdetail.orderid, db_product.\`name\`,db_product_image.image, db_product.price, db_product.instock, db_orderdetail.quantity, db_orderdetail.price as totalDetailPrice
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
const getOrderByID = async (orderCode) => {
    const sqlCheck = `
    select isCustomer
    from db_order
    where orderCode = ?
    `
    const sqlCustomer = `
    select CONCAT(db_order.prefix,db_order.orderCode) as orderID,db_order.customerid, db_customer.fullname, db_customer.phone, db_order.totalPrice,db_province.\`name\` as province, db_district.\`name\` as district, db_customer.address, db_order.payment, db_order.note, db_order.created_at, db_order.modified_at, db_order.\`status\`, db_order.isCustomer
    from db_order
    inner join db_customer on db_customer.id = db_order.customerid
    inner join db_province on db_province.id = db_customer.province
    inner join db_district on db_district.id = db_customer.district
    where db_order.trash  = 0 and db_order.\`isCustomer\` = 1 and db_order.orderCode = ?;
    `
    const sqlGuest = `
    select CONCAT(db_order.prefix,db_order.orderCode) as orderID,db_order.customerid, db_order.fullname, db_order.phone, db_order.totalPrice,db_province.\`name\` as province, db_district.\`name\` as district, db_order.address, db_order.payment, db_order.note, db_order.created_at, db_order.modified_at, db_order.\`status\`, db_order.isCustomer
    from db_order
    inner join db_customer on db_customer.id = db_order.customerid
    inner join db_province on db_province.id = db_order.province
    inner join db_district on db_district.id = db_order.district
    where db_order.trash  = 0 and db_order.\`isCustomer\` = 0 and db_order.orderCode = ?;
    `

    const sqlOrderDetail = `
    select db_orderdetail.id, db_orderdetail.orderid, db_product.\`name\`,db_product_image.image, db_product.price, db_product.instock, db_orderdetail.quantity, db_orderdetail.price as totalDetailPrice
    from db_orderdetail
    inner join db_product on db_product.id = db_orderdetail.productid
    inner join db_product_image on db_product_image.productID = db_orderdetail.productid
    where db_orderdetail.trash = 0 and db_orderdetail.orderid = ?
    group by db_orderdetail.productid;
    `
    const { isCustomer } = await db.queryOne(sqlCheck, orderCode)
    if (isCustomer) {
        const data = await db.queryOne(sqlCustomer, [orderCode])
        const orderInfo = await db.queryMulti(sqlOrderDetail, orderCode)
        return {
            data,
            orderInfo
        }
    } else if (!isCustomer) {
        const data = await db.queryOne(sqlGuest, [orderCode])
        const orderInfo = await db.queryMulti(sqlOrderDetail, orderCode)
        return {
            data,
            orderInfo
        }
    }
}
const createGuestOrder = async ({ fullname, phone, province, district, address, note }) => {
    const sql = `
    insert into db_order(customerid,fullname,phone, province, district, address, totalPrice, note, \`isCustomer\`)
    values(null,?,?,?,?,?,0,?,0);
    `
    const sqlGetID = `
    select orderCode
    from db_order
    where phone = ?
    `
    await db.query(sql, [fullname, phone, province, district, address, note])
    const { orderCode } = await db.queryOne(sqlGetID, [phone])
    return {
        orderCode
    }
}
const createCustomerOrder = async (customerid, { note }) => {
    const sql = `
    insert into db_order(customerid,fullname,phone, province, district, address,totalPrice, note)
    values(?,null,null,null,null,null,0,?);
    `
    const sqlGetID = `
    select orderCode
    from db_order
    where phone = ?
    `
    await db.query(sql, [customerid, note])
    const { orderCode } = await db.queryOne(sqlGetID, [phone])
    return {
        orderCode
    }
}
const createOrderDetail = async ({ listOrdersDetail }, orderId) => {
    const sqlGetPrice = `
    select price
    from db_product
    where trash = 0 and id = ?;
    `
    const sqlCheck = `
    select count(id) as total
    from db_discount
    where productid=?
    `
    const sqlCheckDiscount = `
    select discount_condition, percent
    from db_discount
    where productid = ?
    `
    const sql = `
    insert into db_orderdetail(id, orderid, productid, quantity, price)
    values(uuid(),?,?,?,?,?)
    `
    const sqlTotalPrice = `
    select sum(price) as totalPrice
    from db_orderdetail
    where orderid = ?
    `
    const sqlUpdatePrice = `
    update db_order
    set totalPrice = ?
    where id = ? 
    `
    for (let i = 0; i < listOrdersDetail.length; i++) {
        const { total } = await db.queryOne(sqlCheck, [listOrdersDetail[i].productId])
        if (total == 0) {
            const { price } = await db.queryOne(sqlGetPrice, [listOrdersDetail[i].productId])
            const totalPrice = price * listOrdersDetail[i].quantity
            await db.query(sql, [orderId, listOrdersDetail[i].productId, listOrdersDetail[i].quantity, totalPrice])
        } else if (total > 0) {
            const { discount_condition, percent } = await db.queryOne(sqlCheckDiscount, [listOrdersDetail[i].productId])
            if (quantity >= discount_condition) {
                const { price } = await db.queryOne(sqlGetPrice, [listOrdersDetail[i].productId])
                const totalPrice = price * listOrdersDetail[i].quantity * (1 - percent / 100)
                await db.query(sql, [orderId, listOrdersDetail[i].productId, listOrdersDetail[i].quantity, totalPrice])
            }
            else {
                const { price } = await db.queryOne(sqlGetPrice, [productId])
                const totalPrice = price * quantity
                await db.query(sql, [orderId, listOrdersDetail[i].productId, listOrdersDetail[i].quantity, totalPrice])
            }
        }
    }
    const { totalPrice } = await db.queryOne(sqlTotalPrice, [orderId])
    await db.query(sqlUpdatePrice, [totalPrice, orderId])
}
const cancelCustomerOrder = async (customerID) => {
    const sql = `
    update db_order
    set \`status\` = 'CHỜ HỦY'
    where customerid = ?
    `
    await db.query(sql, [customerID])
}
const cancelOrder = async (orderCode) => {
    const sql = `
    update db_order
    set \`status\` = 'ĐÃ HỦY'
    where orderCode = ?
    `
    await db.query(sql, [orderCode])
}
const deleteOrderById = async (id) => {
    const sql = `update db_order
    set trash =1
    where orderCode = ?;
    `
    const sqlDetail = `update db_orderdetail
    set trash =1
    where orderid = ?;
    `
    await db.query(sql, [id])
    await db.query(sqlDetail, [id])
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
    getAllOrder,
    getGuestOrderbyPhone,
    getCustomerOrderbyId,
    getOrderByID,
    createGuestOrder,
    createCustomerOrder,
    createOrderDetail,
    deleteOrderById,
    parameterOrder,
    cancelCustomerOrder,
    cancelOrder
}