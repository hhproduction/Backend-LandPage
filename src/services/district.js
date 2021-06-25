const db = require('../utils/db')
const getAllDistrictByProvince = async (provinceid) => {
    const sql = `
    select id, \`name\`, \`type\`, provinceid, created_at, created_by, modified_at, modified_by
    from db_district
    where trash = 0 and provinceid = ?
    `
    const data = await db.queryMulti(sql, [provinceid])
    return {
        data
    }
}
const createDistrict = async ({ name, type, provinceid }) => {
    const sql = `
    insert into db_district (\`name\`, \`type\`,provinceid)
    values(?,?,?);
    `
    await db.query(sql, [name, type, provinceid])
}
const updateDistrictByID = async ({ name, type, provinceid, id }) => {
    const sql = `
    update db_district
    set \`name\` = ?
        \`type\` = ?
        provinceid = ?
    where id = ?;
    `
    await db.query(sql, [name, type, provinceid, id])
}
const deleteDistrictByID = async ({ id }) => {
    const sql = `
    updaete db_district
    set trash = 1
    where id = ?;
    `
    await db.query(sql, [id])
}
module.exports = {
    getAllDistrictByProvince,
    createDistrict,
    updateDistrictByID,
    deleteDistrictByID
}