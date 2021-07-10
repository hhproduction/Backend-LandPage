const db = require('../utils/db')
const uuidv4 = require('uuid')
const getAllProduct = async ({ limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    inner join db_category on db_category.id = db_product.catid
    inner join db_producer on db_producer.id = db_product.producer
    where db_product.trash = 0
    limit ?
    offset ?;
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(id) as total from db_product`
    const { total } = await db.queryOne(countsql)
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getAllProductSortedByNumberBuy = async ({ limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    inner join db_category on db_category.id = db_product.catid
    inner join db_producer on db_producer.id = db_product.producer
    where db_product.trash = 0
    order by 
		db_product.number_buy DESC,
        db_product.\`name\` DESC
    limit ?
    offset ?;
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(id) as total from db_product`
    const { total } = await db.queryOne(countsql)
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getAllProductSortedByTime = async ({ limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    inner join db_category on db_category.id = db_product.catid
    inner join db_producer on db_producer.id = db_product.producer
    where db_product.trash = 0
    order by 
		db_product.created_at DESC,
        db_product.\`name\` DESC
    limit ?
    offset ?;
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(id) as total from db_product`
    const { total } = await db.queryOne(countsql)
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getAllProductSortedByPriceASC = async ({ limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    inner join db_category on db_category.id = db_product.catid
    inner join db_producer on db_producer.id = db_product.producer
    where db_product.trash = 0
    order by 
		db_product.price ASC,
        db_product.\`name\` DESC
    limit ?
    offset ?;
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(id) as total from db_product`
    const { total } = await db.queryOne(countsql)
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getAllProductSortedByPriceDESC = async ({ limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    inner join db_category on db_category.id = db_product.catid
    inner join db_producer on db_producer.id = db_product.producer
    where db_product.trash = 0
    order by 
		db_product.price DESC,
        db_product.\`name\` DESC
    limit ?
    offset ?;
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [limit, offset])
    const countsql = `
    select count(id) as total from db_product`
    const { total } = await db.queryOne(countsql)
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getRelatedProduct = async ({ limit, offset }, productID) => {
    const sqlCat = `
    select catid
    from db_product
    where trash = 0 and id = ?
    `
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    inner join db_category on db_category.id = db_product.catid
    inner join db_producer on db_producer.id = db_product.producer
    where db_product.trash = 0 and db_product.catid = ?
    limit ?
    offset ?;
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const { catid } = await db.queryOne(sqlCat, productID)
    const products = await db.queryMulti(sql, [catid, limit, offset])
    const countsql = `
    select count(id) as total 
    from db_product
    where catid = ?
    `
    const { total } = await db.queryOne(countsql, [catid])
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
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
    select db_product.id,db_category.\`name\` as category, db_product.\`name\`,db_product.videoUrl, db_product.detail as description, db_producer.\`name\` as producer,db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
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
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    const result = await db.queryOne(sql, [id])
    const imageList = await db.queryMulti(sqlImageProduct, [id])
    const variants = await db.queryMulti(sqlVartiant, [id])
    const comments = await db.queryMulti(sqlComment, [id])
    return {
        data: {
            ...result,
            variants: variants,
            imageList: imageList,
            comments: comments
        }
    }
}
const getProductByName = async (name, { limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    inner join db_category on db_category.id = db_product.catid
    inner join db_producer on db_producer.id = db_product.producer
    where db_product.trash = 0 and db_product.\`name\` LIKE ?
    limit ?
    offset ?;
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [name, limit, offset])
    const countsql = `
    select count(id) as total from db_product
    where trash =0 and db_product.\`name\` LIKE ?
    `
    const { total } = await db.queryOne(countsql, [name])
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
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
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    where catid in 
    (select id from db_category
    where parent_id = ?
    or  id = ?)
    limit ?
    offset ?; 
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [categoryId, categoryId, limit, offset])
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
    const countsql = `
        select count(id) as total
        from db_product
        where catid in (
            select id from db_category
            where parent_id = ?
            or  id = ?
        )
        `
    const { total } = await db.queryOne(countsql, [categoryId, categoryId])
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getProductByCategoryIDSortedByTime = async (categoryId, { limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    where catid in 
    (select id from db_category
    where parent_id = ?
    or  id = ?)
    order by created_at DESC
    limit ?
    offset ?; 
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [categoryId, categoryId, limit, offset])
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
    const countsql = `
        select count(id) as total
        from db_product
        where catid in (
            select id from db_category
            where parent_id = ?
            or  id = ?
        )
        `
    const { total } = await db.queryOne(countsql, [categoryId, categoryId])
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getProductByCategoryIDSortedByNumberBuy = async (categoryId, { limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    where catid in 
    (select id from db_category
    where parent_id = ?
    or  id = ?)
    order by number_buy DESC,
                \`name\` ASC
    limit ?
    offset ?; 
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [categoryId, categoryId, limit, offset])
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
    const countsql = `
        select count(id) as total
        from db_product
        where catid in (
            select id from db_category
            where parent_id = ?
            or  id = ?
        )
        `
    const { total } = await db.queryOne(countsql, [categoryId, categoryId])
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getProductByCategoryIDSortedByPriceASC = async (categoryId, { limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    where catid in 
    (select id from db_category
    where parent_id = ?
    or  id = ?)
    order by price ASC,
                \`name\` ASC
    limit ?
    offset ?; 
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [categoryId, categoryId, limit, offset])
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
    const countsql = `
        select count(id) as total
        from db_product
        where catid in (
            select id from db_category
            where parent_id = ?
            or  id = ?
        )
        `
    const { total } = await db.queryOne(countsql, [categoryId, categoryId])
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getProductByCategoryIDSortedByPriceDESC = async (categoryId, { limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    where catid in 
    (select id from db_category
    where parent_id = ?
    or  id = ?)
    order by price ASC,
                \`name\` ASC
    limit ?
    offset ?; 
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [categoryId, categoryId, limit, offset])
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
    const countsql = `
        select count(id) as total
        from db_product
        where catid in (
            select id from db_category
            where parent_id = ?
            or  id = ?
        )
        `
    const { total } = await db.queryOne(countsql, [categoryId, categoryId])
    return {
        data,
        metadata: {
            length: data.length,
            total
        }
    }
}
const getProductByProducerID = async (producerId, { limit, offset }) => {
    const sql = `
    select db_product.id, db_product.\`name\`, db_category.\`name\` as category, db_producer.\`name\` as producer,db_product.detail, db_product.instock,db_product.number_buy, db_product.price,db_product.created_at,db_product.created_by, db_product.modified_at,db_product.modified_by,db_product.\`status\`
    from db_product
    inner join db_category on db_category.id = db_product.catid
    inner join db_producer on db_producer.id = db_product.producer
    where db_product.trash = 0 and db_product.producer=? 
    limit ?
    offset ?;
    `
    const sqlImageList = `
    select image
    from db_product_image
    where productID = ?
    `
    const sqlVartiant = `
    select id, color, imageID as image_id, productID
    from db_product_variant
    where productID = ?
    `
    const sqlComment = `
    select id, productID, username, comment, modified_at
    from db_product_comment
    where productID = ?
    `
    var data = []
    const products = await db.queryMulti(sql, [producerId, limit, offset])
    for (let i = 0; i < products.length; i++) {
        const imageList = await db.queryMulti(sqlImageList, [products[i].id])
        const variants = await db.queryMulti(sqlVartiant, [products[i].id])
        const comments = await db.queryMulti(sqlComment, [products[i].id])
        data.push({
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            producer: products[i].producer,
            description: products[i].detail,
            instock: products[i].instock,
            number_buy: products[i].number_buy,
            price: products[i].price,
            create_at: products[i].create_at,
            create_by: products[i].create_by,
            modified_by: products[i].modified_by,
            modified_at: products[i].modified_at,
            status: products[i].status,
            variants: variants,
            imageList: imageList,
            comments: comments
        })
    }
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
const createProduct = async ({ catid, name, videoUrl, detail, producer, instock, price }) => {
    const sql = `
    insert into db_product (id, catid, \`name\`,  videoUrl,detail, detail, producer, instock, number_buy, price)
    values(uuid(),?,?,?,?,?,?,?,0,?);
    `
    const sqlID = `
    select id
    from db_product
    where \`name\` = ?;
    `
    await db.query(sql, [catid, name, videoUrl, detail, producer, Number(instock), Number(price)])
    const { id } = await db.queryOne(sqlID, [name])
    return {
        id
    }
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
const updateProductByID = async ({ name, videoUrl, detail, producer, instock, price, catid, productID }) => {
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
    description =?,
    detail = ?, 
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
    getAllProductSortedByNumberBuy,
    getAllProductSortedByPriceASC,
    getAllProductSortedByPriceDESC,
    getAllProductSortedByTime,
    getRelatedProduct,
    getProductById,
    getProductByCategoryID,
    getProductByCategoryIDSortedByNumberBuy,
    getProductByCategoryIDSortedByPriceASC,
    getProductByCategoryIDSortedByPriceDESC,
    getProductByCategoryIDSortedByTime,
    createProduct,
    createProductImage,
    updateProductByID,
    deleteProductByID,
    parameterProduct,
    getProductByName,
    getProductByProducerID,
    deleteProductImageByID
}