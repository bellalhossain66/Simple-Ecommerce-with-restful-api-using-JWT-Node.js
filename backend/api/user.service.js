const pool = require('../../lib/database')

module.exports = {
    productFetch: callBack => {
        pool.query(
            "select * from product order by id desc limit 10",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    createUser: (body, callBack) => {
        pool.query(
            "insert into user(first_name,last_name,email,password) values(?,?,?,?)", [
                body.first_name,
                body.last_name,
                body.email,
                body.password
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    checkUser: (email, callBack) => {
        pool.query(
            "select * from user where email=?", [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    }
}