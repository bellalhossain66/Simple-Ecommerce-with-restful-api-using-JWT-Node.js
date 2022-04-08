const { productFetch, createUser, checkUser } = require('./user.service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
    productView: (req, res) => {
        productFetch((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!",
                    data: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Product found",
                data: results
            })
        })
    },
    userRegistration: (req, res) => {
        const body = req.body
        if (body.first_name != '' && body.last_name != '' && body.email != '' && body.password != '') {
            const salt = genSaltSync(10)
            body.password = hashSync(body.password, salt)
            createUser(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error!",
                        data: err
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Resgistration Successful",
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Fill all option!"
            })
        }
    },
    userLogin: (req, res) => {
        const body = req.body
        if (body.email != '' && body.password != '') {
            checkUser(body.email, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error!",
                        data: err
                    })
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Invalid email & password"
                    })
                }
                const result = compareSync(body.password, results.password)
                if (result) {
                    const jsonwebtoken = sign({
                        first_name: results.first_name,
                        last_name: results.last_name,
                        email: results.email
                    }, process.env.JWT_USER_TOKEN, {
                        expiresIn: '1h'
                    })
                    res.cookie('jwtoken', jsonwebtoken)
                    res.cookie('loginCheck', true)
                    return res.status(200).json({
                        success: 1,
                        message: "Login Successfull"
                    })
                } else {
                    return res.status(404).json({
                        success: 0,
                        message: "Invalid email & password"
                    })
                }
            })
        } else {
            return res.json({
                success: 0,
                message: "Fill all option!"
            })
        }
    }
}