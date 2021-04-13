const db = require('../utils/db')

const login = async (user) => {
    const getuserSQL = `
    select username,password,role from account where username=? limit 1;`
    const result = await db.queryOne(getuserSQL, [user.username])
    if (result) {
        return {
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