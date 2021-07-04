const db = require('../utils/db');
const getAllOrderDetail = async ({ limit, offset }) => {
    const sql = `
    select id,orderid,productid,quantity, price, note
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
    select id,orderid,productid,quantity, price, note
    from db_orderdetail
    where trash = 0 and id = ?
    `
    const data = await db.queryOne(sql, [id])
    return {
        data
    }
}

const createOrderDetail = async ({ orderId, productId, quantity, note }) => {
    const sqlGetPrice = `
    select price
    from db_product
    where trash = 0 and id = ?;
    `
    const sqlCheck = `
    select count(id) as total
    from db_discount
    `
    const sqlCheckDiscount = `
    select discount_condition, percent
    from db_discount
    where productid = ?
    `
    const sql = `
    insert into db_orderdetail(id, orderid, productid, quantity, price, note)
    values(uuid(),?,?,?,?,?)
    `
    const { total } = await db.queryOne(sqlCheck)
    if (total == 0) {
        const { price } = await db.queryOne(sqlGetPrice, [productId])
        const totalPrice = price * quantity
        await db.query(sql, [orderId, productId, quantity, totalPrice, note])
    } else if (total > 0) {
        const { discount_condition, percent } = await db.queryOne(sqlCheckDiscount, [productId])
        if (quantity >= discount_condition) {
            const { price } = await db.queryOne(sqlGetPrice, [productId])
            const totalPrice = price * quantity * (1 - percent / 100)
            await db.query(sql, [orderId, productId, quantity, totalPrice, note])
        }
        else {
            const { price } = await db.queryOne(sqlGetPrice, [productId])
            const totalPrice = price * quantity
            await db.query(sql, [orderId, productId, quantity, totalPrice, note])
        }
    }

}
const updateOrderDetail = async ({ quantity, note }, id) => {
    const sqlGetProductId = `
    select productid
    from db_orderdetail
    where trash = 0 and id = ?
    `
    const { productId } = await db.queryOne(sqlGetProductId, [id])
    const sqlGetPrice = `
    select price
    from db_product
    where trash = 0 and id = ?;
    `
    const { price } = await db.queryOne(sqlGetPrice, [productId]).price * quantity
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