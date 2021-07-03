const db = require('../utils/db')

const getAllDiscount = async ({ limit, offset }) => {
    const sql = `
    select db_discount.id, db_product.\`name\`, db_discount.discount_condition, db_discount.percent, db_discount.created_at,db_discount.created_by,db_discount.modified_at,db_discount.modified_by
    from db_discount
    inner join db_product on db_product.id = db_discount.productid
    limit ?
    offset ?;
    `
    const sqlCount = `
    select count(id) as total
    from db_discount
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const { total } = await db.queryOne(sqlCount)
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getDisCountByProduct = async (productID) => {
    const sql = `
    select db_discount.id, db_product.\`name\`, db_discount.discount_condition, db_discount.percent, db_discount.created_at,db_discount.created_by,db_discount.modified_at,db_discount.modified_by
    from db_discount
    inner join db_product on db_product.id = db_discount.productid
    where db_discount.productid = ?
    `
    const data = await db.queryOne(sql, [productID])
    return {
        data
    }
}
const createDiscount = async ({ productid, discount_condition, percent }) => {
    const sql = `
    insert db_discount (id, productid, discount_condition, percent)
    values(uuid(),?,?,?);
    `
    await db.query(sql, [productid, discount_condition, percent])
}
const updateDiscountByID = async ({ productid, discount_condition, percent }, id) => {
    const sql = `
    update db_discount
    set productid=?,
    discount_condition=?,
    percent=?
    where id=?
    `
    await db.query(sql, [productid, discount_condition, percent, id])
}
const deleteDiscountByID = async (id)=>{
    const sql=`
    delete from db_discount
    where id = ?
    `
    await db.query(sql,[id])
}
module.exports={
    getAllDiscount,
    getDisCountByProduct,
    createDiscount,
    updateDiscountByID,
    deleteDiscountByID
}