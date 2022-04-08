const pool = require('../../lib/database')

module.exports = {
    adminRegistration: (data, callBack) => {
        pool.query(
            "insert into admin(first_name,last_name,email,password) values(?,?,?,?)", [
                data.first_name,
                data.last_name,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    adminById: (id, callBack) => {
        pool.query(
            "select id,first_name,last_name,email from admin where id=?", [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    adminByEmail: (email, callBack) => {
        pool.query(
            "select * from admin where email=?", [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    }
}