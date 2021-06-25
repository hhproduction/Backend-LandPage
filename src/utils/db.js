const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})
if (!pool) {
    console.log("Database is not connect.");
}
else {
    console.log("Database is connected successful.");
}

const logMySQLQuerry = (sql, params) => {
    console.log('sql:',
        mysql.format(sql, params)
            .replace(/\r?\n|r/g, ' ')
            .split(' ').filter(e => e !== '').join(' '));
}

const query = (sql, params) => {
    logMySQLQuerry(sql, params)
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if (err) reject(err)
            else resolve()
        })
    })
}
// return (q,p).then().catch(err).finally(nhat ky)
const queryOne = (sql, params) => {
    logMySQLQuerry(sql, params)
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if (err) reject(err)
            else resolve(result[0])
        })
    })
}
const queryMulti = (sql, params) => {
    logMySQLQuerry(sql, params)
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