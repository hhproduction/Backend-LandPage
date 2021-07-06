const db = require('../utils/db')
const getAllCategory = async () => {
    const sql = `
    select id, parent_id, \`name\`,created_at, created_by, modified_at, modified_by
    from db_category
    where trash = 0 and parent_id = 0
    `
    const sqlChild = `
    select id, parent_id, \`name\`,created_at, created_by, modified_at, modified_by
    from db_category
    where trash = 0 and parent_id = ?
    `
    var data = []
    const parentCat = await db.queryMulti(sql)
    for (let i = 0; i < parentCat.length; i++) {
        const childCat = await db.queryMulti(sqlChild, [parentCat[i].id])
        data.push({
            name: parentCat[i].name,
            id: parentCat[i].id,
            parent_id: parentCat[i].parent_id,
            children: childCat
        })
    }
    return {
        data
    }
}
const getCategoryByID = async (id) => {
    const sql = `
    select id, parent_id, \`name\`,created_at, created_by, modified_at, modified_by
    from db_category 
    where id = ? and trash = 0
    limit 1;
    `
    const data = await db.queryOne(sql, [id])
    return { data }
}
const createCategory = async ({ name, parent_id }) => {
    const sql = `
    insert into db_category (parent_id, \`name\` )
    values(?,?);
    `
    const data = await db.query(sql, [parent_id, name])
    return data
}
const updateCategoryByID = async ({ name, level, id }) => {
    const sql = `
    update db_category 
    set \`name\` = ?,
        parent_id = ?
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





