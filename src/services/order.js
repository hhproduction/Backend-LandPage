const db = require('../utils/db')
const getAllOrder = async ({ limit, offset }) => {
    const sql = `
select orderId,customerId,productId,price,amount,note,\`status\`,created_at
from \`order\`
where isDelete = 0
limit ?
offset ?
`
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(orderId) as total from \`order\`
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
const getOrderbyId = async (id) => {
    const sql = `
    select orderId,username,productId,price,amount,note,\`status\`,created_at
    from \`order\`
    where isDelete = 0
    and orderId = ?`
    const data = await db.queryOne(sql, [id])
    return {
        data
    }
}
const creatOrder = async ({ username, productId, price, amount, note, status }) => {
    const sql = `
insert into \`order\`(orderId,username,productId,price,amount,note,status)
values(uuid(),?,?,?,?,?,?)`
    await db.query(sql, [username, productId, price, amount, note, status])
}
const updateOrderbyId = async ({ username, productId, price, amount, note, status }) => {
    const sql = `
    update \`order\`
    set username=?,
    productId=?,
    price=?,
    amount=?,
    note=?,
    status=?
    where orderId = ? and isDelete = 0`
    await db.query(sql, [username, productId, price, amount, note, status, id])
}
const deleteOrderbyId = async (id) => {
    const sql = `update \`order\`
    set isDelete =1
    where orderId = ?`
    await db.query(sql, [id])
}
const parameterOrder = async () => {
    const sql = `
    select orderId,username,productId
    from \`order\`
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
    getAllOrder,
    getOrderbyId,
    creatOrder,
    updateOrderbyId,
    deleteOrderbyId,
    parameterOrder,
}