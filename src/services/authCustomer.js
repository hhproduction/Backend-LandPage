const db = require('../utils/db')

const login = async (user) => {
    const getuserSQL = `
    select username,\`password\`, id from db_customer where username=? limit 1;`
    const result = await db.queryOne(getuserSQL, [user.username])
    
    if (result) {
        return {
            username: result.username,
            password: result.password,
            customerId: result.id
        }
    } else {
        return false
    }
}
module.exports = {
    login
}