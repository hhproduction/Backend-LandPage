const db = require('../utils/db')
const getAllProducer = async ({ limit, offset }) => {
    const sql = `
    select id, name, image, created_at, created_by, modified_at, modified_by,\`status\`
    from db_producer
    where trash = 0
    limit ?
    offset ?;
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(id) as total from db_producer`
    const { total } = await db.queryOne(countsql)
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const createProducer = async ({ name }, image) => {
    const sql = `
    insert into db_producer (id,  \`name\`, image)
    values(uuid(),?,?);
    `
    await db.query(sql, [name, image.location])
}
const updateProducerByID = async ({ name, image, id }) => {
    const sql = `
    update db_producer
    set \`name\` = ?,
    image = ?
    where id = ? and trash =0;
    `
    await db.query(sql, [name, image, id])
}
const deleteProducerByID = async ({ id }) => {
    const sql = `
    update db_producer
    set trash = 1;
    where id = ? ;
    `
    await db.query(sql, [id])
}
const parameterProducer = async () => {
    const sql = `
    select id, \`name\`
    from db_producer
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
    getAllProducer,
    createProducer,
    updateProducerByID,
    deleteProducerByID,
    parameterProducer
}