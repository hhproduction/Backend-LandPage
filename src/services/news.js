const db = require('../utils/db')
const uuidv4 = require('uuid')
const getAllNews = async ({ limit, offset }) => {
    const sql = `
    select db_news.id, db_news.\`title\`, db_news.created_at,db_news.created_by, db_news.modified_at,db_news.modified_by,db_news.\`status\`,db_news_image.image
    from db_news, db_news_image
    where db_news.id = newsID
    and db_news.trash = 0
    group by newsID
    limit ?
    offset ?;
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(id) as total from db_news`
    const { total } = await db.queryOne(countsql)
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getNewsById = async (id) => {
    const sql = `
    select db_news.id, db_news.\`title\`, db_news.\`detail\` ,db_news.videoUrl, db_news.created_at,db_news.created_by, db_news.modified_at,db_news.modified_by,db_news.\`status\`
    from db_news
    where db_news.trash = 0 and db_news.id=?;    
    `
    const sqlImageNews = `
    select db_news_image.id, db_news_image.image, db_news_image.\`type\`, db_news_image.size, db_news_image.newsID
	from db_news_image
    inner join db_news on db_news.id = db_news_image.newsID
    where db_news_image.newsID = ?;
    `
    const data = await db.queryOne(sql, [id])
    const listImage = await db.queryMulti(sqlImageNews, [id])
    return {
        data,
        listImage
    }
}

const createNews = async ({ title, detail, videoUrl }) => {
    const sql = `
    insert into db_news (id, title, \`detail\`,  videoUrl)
    values(uuid(),?,?,?);
    `
    await db.query(sql, [title, detail, videoUrl])
}
const createNewsImage = async (files, id) => {
    var values = new Array();
    for (let i = 0; i < files.length; i++) {
        values.push([uuidv4.v4(), id, files[i].path, files[i].mimetype, files[i].size])
    }
    const sql = `
    insert into db_news_image (\`id\`,\`newsID\`, \`image\`,\`type\`,\`size\`,) values 
    ?
    `
    await db.query(sql, [values])
}
const updateNewsByID = async ({ title, detail, videoUrl }) => {
    const sql = `
update db_news
set \`title\` = ?, 
 detail=?
 videoUrl =?,
 detail = ?, 
 feedBack =?,
 producer = ?, 
 instock = ?, 
 number_buy = ?, 
 price = ?,  
 catid = ? 
 where id = ? and trash = 0;
 `
    await db.query(sql, [title, detail, videoUrl])
}

const deleteNewsByID = async (id) => {
    const sql = `
    update db_news
    set trash =1
    where id = ?;
    `
    await db.query(sql, [id])
}
const deleteNewsImageByID = async (id) => {
    const sql = `
    delete from db_news_image where image like ?;
    `
    await db.query(sql, [id])
}
const parameterNews = async () => {
    const sql = `
    select id, \`title\`
    from db_news
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
    getAllNews,
    getNewsById,
    createNews,
    createNewsImage,
    updateNewsByID,
    deleteNewsByID,
    parameterNews,
    deleteNewsImageByID
}