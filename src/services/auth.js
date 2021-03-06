const db = require('../utils/db')

const login = async (user) => {
    const getuserSQL = `
    select id, username,\`password\`,role from db_admin where username=? limit 1;`
    const result = await db.queryOne(getuserSQL, [user.username])
    if (result) {
        return {
            adminID: result.id,
            username: result.username,
            password: result.password,
            role: result.role,
        }
    } else {
        return false
    }
}
module.exports = {
    login
}