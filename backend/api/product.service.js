const pool = require('../../lib/database')

module.exports = {
    productCreate: (body, callBack) => {
        pool.query(
            "insert into product(name,price,image) values(?,?,?)", [
                body.name,
                body.price,
                body.image
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    productFetch: callBack => {
        pool.query(
            "select * from product",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    productDelete: (id, callBack) => {
        pool.query(
            "delete from product where id=?", [id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    productSearch: (search, callBack) => {
        pool.query(
            "select * from product where id like '%" + search + "%' or name like '%" + search + "%' or price like '%" + search + "%'",
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    productDetail: (id, callBack) => {
        pool.query(
            "select * from product where id=?", [id],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    productUpdate: (body, callBack) => {
        pool.query(
            "update product set name=?,price=?,image=? where id=?", [
                body.name,
                body.price,
                body.image,
                body.id
            ],
            (error, results, fields) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    }
}