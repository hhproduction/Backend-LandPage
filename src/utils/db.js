const mysql = require('mysql');


const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})
if(!pool){
    console.log("Database is not connect.");
}
else{
    console.log("Database is connected successful.");
}

const logMySQLQuerry = (sql, params) => {
    console.log('sql:',
    mysql.format(sql,params)
    .replace(/\r?\n|r/g,' ')
    .split(' ').filter(e => e !== '').join(' '));
}

const query = (sql, params) => {
    logMySQLQuerry(sql,params)
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if (err) reject(err)
            else resolve()
        })
    })
}
// return (q,p).then().catch(err).finally(nhat ky)
const queryOne = (sql, params) => {
    logMySQLQuerry(sql,params)
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if (err) reject(err)
            else resolve(result[0])
        })
    })
}
const queryMulti = (sql, params) => {
    logMySQLQuerry(sql,params)
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            else resolve(result)
        })
    })
}
module.exports = {
    query,
    queryMulti,
    queryOne
}