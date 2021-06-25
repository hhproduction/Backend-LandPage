const db = require('../utils/db')
const getAllProvince = async () => {
    const sql = `
    select id, \`name\`, \`type\`,created_at, created_by, modified_at, modified_by
    from db_province
    where trash = 0
    `
    const data = await db.queryMulti(sql)
    return {
        data
    }
}
const createProvince = async ({ name, type }) => {
    const sql = `
    insert into db_province (\`name\`, \`type\`)
    values(?,?);
    `
    await db.query(sql, [name, type])
}
const updateProvinceByID = async ({ name, type, id }) => {
    const sql = `
    update db_province
    set \`name\` = ?
        \`type\` = ?
    where id = ?;
    `
    await db.query(sql, [name, type, id])
}
const deleteProvinceByID = async ({ id }) => {
    const sql=`
    updaete db_province
    set trash = 1
    where id = ?;
    `
    await db.query(sql,[id])
}
module.exports = {
    getAllProvince,
    createProvince,
    updateProvinceByID,
    deleteProvinceByID
}