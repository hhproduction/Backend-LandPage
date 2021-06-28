const db = require('../utils/db')
const uuidv4 = require('uuid')
const getAllProduct = async ({ limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`,db_product_image.image
    from db_product, db_product_image, db_category, db_producer
    where db_product.id = db_product_image.productID
    and db_product.catid = db_category.id
    and db_product.producer = db_producer.id
    and db_product.trash = 0
    group by productID
    limit ?
    offset ?;
    `
    const data = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(id) as total from db_product`
    const { total } = await db.queryOne(countsql)
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getProductById = async (id) => {
    const sql = `
    select db_product.id,db_category.\`name\` as category, db_product.\`name\`,db_product.videoUrl,db_product.detail,db_product.feedBack, db_producer.\`name\` as producer,db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    inner join db_category on db_category.id = db_product.catid
    inner join db_producer on db_producer.id = db_product.producer
    where db_product.trash = 0 and db_product.id=?;    
    `
    const sqlImageProduct = `
    select db_product_image.id, db_product_image.image, db_product_image.\`type\`, db_product_image.size, db_product_image.productID
	from db_product_image
    inner join db_product on db_product.id = db_product_image.productID
    where db_product_image.productID = ?;
    `
    const data = await db.queryOne(sql, [id])
    const listImage = await db.queryMulti(sqlImageProduct, [id])
    return {
        data,
        listImage
    }
}
const getProductByName = async (name, { limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`,db_product_image.image
    from db_product, db_product_image
    where db_product.id = productID
    and db_product.trash = 0 and db_product.\`name\` LIKE ?
    group by productID
    limit ?
    offset ?;
    `
    const data = await db.queryMulti(sql, [name, limit, offset])
    const countsql = `
    select count(id) as total from db_product
    where trash =0 and db_product.\`name\` LIKE ?
    `
    const { total } = await db.queryOne(countsql, [name])
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getProductByCategoryID = async (categoryId, { limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`,db_product_image.image
    from db_product, db_product_image
    where db_product.id = productID
    and db_product.trash = 0 and db_product.catid=? 
    group by productID
    limit ?
    offset ?;
    `
    const data = await db.queryMulti(sql, [categoryId, limit, offset])
    const countsql = `
    select count(id) as total from db_product
    where trash =0 and catid=?
    `
    const { total } = await db.queryOne(countsql, [categoryId])
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getProductByProducerID = async (categoryId, { limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`,db_product_image.image
    from db_product, db_product_image
    where db_product.id = productID
    and db_product.trash = 0 and db_product.producer=? 
    group by productID
    limit ?
    offset ?;
    `
    const data = await db.queryMulti(sql, [categoryId, limit, offset])
    const countsql = `
    select count(id) as total from db_product
    where trash =0 and producer=?
    `
    const { total } = await db.queryOne(countsql, [categoryId])
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const createProduct = async ({ catid, name, videoUrl, detail, feedBack, producer, instock, number_buy, price }) => {
    const sql = `
    insert into db_product (id, catid, \`name\`,  videoUrl, detail, feedBack, producer, instock, number_buy, price)
    values(uuid(),?,?,?,?,?,?,?,?,?);
    `
    await db.query(sql, [catid, name, videoUrl, detail, feedBack, producer, instock, number_buy, price])
}
const createProductImage = async (files, id) => {
    var values = new Array();
    for (let i = 0; i < files.length; i++) {
        values.push([uuidv4.v4(), files[i].location, files[i].mimetype, files[i].size, id])
    }
    const sql = `
    insert into db_product_image (\`id\`, \`image\`,\`type\`,\`size\`,\`productID\`) values 
    ?
    `
    await db.query(sql, [values])
}
const updateProductByID = async ({ name, videoUrl, detail, feedBack, producer, instock, price, catid, productID }) => {
    const sqlCountBuy = `
    select sum(quantity) as number_buy
    from db_orderdetail
    inner join db_product on db_product.id = db_orderdetail.productid
    where db_orderdetail.productid = ?
    `
    const number_buy = await db.queryOne(sqlCountBuy, [productID])
    const sql = `
    update db_product
    set \`name\` = ?, 
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
    await db.query(sql, [name, videoUrl, detail, feedBack, producer, instock, number_buy, price, catid, productID])
}
const deleteProductByID = async (id) => {
    const sql = `
    update db_product
    set trash =1
    where id = ?;
    `
    await db.query(sql, [id])
}
const deleteProductImageByID = async (id) => {
    const sql = `
    delete from db_product_image where image like ?;
    `
    await db.query(sql, [id])
}
const parameterProduct = async () => {
    const sql = `
    select id, \`name\`
    from db_product
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
    getAllProduct,
    getProductById,
    createProduct,
    createProductImage,
    updateProductByID,
    deleteProductByID,
    getProductByCategoryID,
    parameterProduct,
    getProductByName,
    getProductByProducerID,
    deleteProductImageByID
}