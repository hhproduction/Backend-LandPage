const db = require('../utils/db');
const getAllOrderDetail = async ({ limit, offset }) => {
    const sql = `
    select orderNum,orderId,productId,price,quantity,created_at
    from \`orderdetail\`
    where isDelete = 0
    limit ?
    offset ?
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(orderNum) as total from \`orderdetail\`
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
    select orderNum,orderId,productId,price,quantity,created_at
    from \`orderdetail\`
    where isDelete = 0 and orderId = ?
    `
    const data = await db.queryOne(sql,[id])
    return{
        data
    }
}
const createOrderDetail = async (orderId,productId,price,quantity) =>{
    const sql = `
    insert into \`orderdetail\`(orderNum,orderId,productId,price, quantity)
    values(uuid(),?,?,?,?)
    `
    await db.query(sql,[orderId,productId,price,quantity])
}
const updateOrderDetail = async ({orderId,productId,price,quantity,orderNum})=>{
    const sql=`
    update \`orderdetail\`
    set orderId=?,
    productId=?,
    price=?,
    quantity=?,
    where orderNum = ? and isDelete = 0` 
    await db.query(sql,[orderId,productId,price,quantity,orderNum])
}
const deleteOrderDetail = async(id)=>{
    const sql = `
    update \`orderdetail\`
    set isDelete = 1
    where orderNum = ?
    `
    await db.query(sql,[id])
}

module.exports={
    getAllOrderDetail,
    getOrderDetailbyId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
}