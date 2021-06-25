const db = require('../utils/db')
const getAllCategory = async ({ limit, offset }) => {
    const sql = `
    select id, \`name\`, \`level\`,created_at, created_by, modified_at, modified_by
    from db_category
    where trash = 0
    limit ?
    offset ?;
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(id) as total from db_category`
    const { total } = await db.queryOne(countsql)
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getCategoryByID = async (id) => {
    const sql = `
    select id, \`name\`, \`level\`,created_at, created_by, modified_at, modified_by
    from db_category 
    where id = ? and trash = 0
    limit 1;
    `
    const data = await db.queryOne(sql, [id])
    return { data }
}
const createCategory = async ({ name, level }) => {
    const sql = `
    insert into db_category (id, \`name\`, \`level\` )
    values(uuid(),?,?);
    `
    const data = await db.query(sql, [name, level])
    return data
}
const updateCategoryByID = async ({ name, level, id }) => {
    const sql = `
    update db_category 
    set \`name\` = ?,
        \`level\` = ?
    where id = ? and trash = 0;
    `
    await db.query(sql, [name, level, id])

}
const deleteCategoryByID = async (id) => {
    const sql = `
    update db_category
    set trash =1
    where id = ?;
    `
    await db.query(sql, [id])
}
const parameterCategory = async () => {
    const sql = `
    select id, \`name\`
    from db_category
    where trash = 0;
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
    getAllCategory,
    getCategoryByID,
    createCategory,
    updateCategoryByID,
    deleteCategoryByID,
    parameterCategory
}





