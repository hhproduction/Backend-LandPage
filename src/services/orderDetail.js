const db = require('../utils/db');
const getAllOrderDetail = async ({ limit, offset }) => {
    const sql = `
    select id,orderid,productid,quantity, price, note, created_at, modified_at
    from db_orderdetail
    where trash = 0
    limit ?
    offset ?
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(id) as total from db_orderdetail
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
const getOrderDetailbyId = async (id) => {
    const sql = `
    select id,orderid,productid,quantity, price, note, created_at, modified_at
    from db_orderdetail
    where trash = 0 and id = ?
    `
    const data = await db.queryOne(sql, [id])
    return {
        data
    }
}

const createOrderDetail = async ({orderId, productId, quantity, note}) => {
    const sqlGetPrice = `
    select price
    from db_product
    where trash = 0 and id = ?;
    `
    const sql = `
    insert into db_orderdetail(id, orderid, productid, quantity, price, note)
    values(uuid(),?,?,?,?,?)
    `
    const {price} = await db.queryOne(sqlGetPrice,[productId])
    const totalPrice = price*quantity
    await db.query(sql, [orderId, productId, quantity,totalPrice, note])
}
const updateOrderDetail = async ({ quantity, note }, id) => {
    const sqlGetProductId = `
    select productid
    from db_orderdetail
    where trash = 0 and id = ?
    `
    const {productId} = await db.queryOne(sqlGetProductId,[id])
    const sqlGetPrice = `
    select price
    from db_product
    where trash = 0 and id = ?;
    `
    const {price} = await db.queryOne(sqlGetPrice,[productId]).price*quantity
    const sql = `
    update db_orderdetail
    set quantity=?,
        price = ?,
        note = ?
    where id = ? and trash = 0`
    await db.query(sql, [quantity, price, note, id])
}
const deleteOrderDetail = async (id) => {
    const sql = `
    update db_orderdetail
    set trash = 1
    where id = ?
    `
    await db.query(sql, [id])
}

module.exports = {
    getAllOrderDetail,
    getOrderDetailbyId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
}