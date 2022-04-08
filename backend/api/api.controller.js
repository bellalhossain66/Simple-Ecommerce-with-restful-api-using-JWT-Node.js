const { adminRegistration, adminById, adminByEmail } = require('./api.service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
    createUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        if (body.first_name != '' && body.last_name != '' && body.email != '' && body.password != '') {
            body.password = hashSync(body.password, salt)
            adminRegistration(body, (err, results) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error!"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            })
        } else {
            return res.json({
                success: 0,
                message: "Please fill all option!"
            })
        }
    },
    fetchAdminById: (req, res) => {
        const id = req.params.id
        adminById(id, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                })
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    loginAdmin: (req, res) => {
        const body = req.body
        if (body.email != '' && body.password != '') {
            adminByEmail(body.email, (err, results) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error!"
                    })
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Invalid email or password"
                    })
                }
                const result = compareSync(body.password, results.password)
                if (result) {
                    const jsonwebtoken = sign({
                            first_name: results.first_name,
                            last_name: results.last_name,
                            email: results.email
                        },
                        process.env.JWT_TOKEN, {
                            expiresIn: '1h'
                        }
                    )
                    res.cookie('jwtoken', jsonwebtoken)
                    res.cookie('loginCheck', true)
                    return res.json({
                        success: 1,
                        message: "Login successful",
                        token: jsonwebtoken
                    })
                } else {
                    return res.json({
                        success: 0,
                        message: "Invalid email or password"
                    })
                }
            })
        } else {
            return res.json({
                success: 0,
                message: "Please fill all option!"
            })
        }
    }
}