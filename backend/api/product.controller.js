const { productCreate, productFetch, productDelete, productSearch, productDetail, productUpdate } = require('./product.service')

module.exports = {
    productInsert: (req, res) => {
        let body = req.body
        if (body.name != '' && body.price != '' && body.image != '') {
            productCreate(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error!"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Product Add successfull",
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fill image,name,price option!"
            })
        }
    },
    productView: (req, res) => {
        productFetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!",
                    data: err
                })
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No data found!"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data found",
                data: results
            })
        })
    },
    productRemove: (req, res) => {
        const body = req.body
            //console.log(body)
        productDelete(body.id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Product Deleted",
                data: results
            })
        })
    },
    productSearchBy: (req, res) => {
        const body = req.body
        productSearch(body.search, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!",
                    data: err
                })
            }
            if (results.length == 0) {
                return res.status(404).json({
                    success: 0,
                    message: "No data found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data found",
                data: results
            })
        })
    },
    productDetailById: (req, res) => {
        const body = req.params
        productDetail(body.id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!",
                    data: err
                })
            }
            if (results.length == 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Data not found!"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data found",
                data: results
            })
        })
    },
    productUpdateById: (req, res) => {
        const body = req.body
        productUpdate(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Product Update Succesfully",
                data: results
            })
        })
    }
}