const { verify } = require('jsonwebtoken')

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.cookies.jwtoken
            //console.log(token)
        if (token) {
            verify(token, process.env.JWT_TOKEN, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: 0,
                        message: "Please login!",
                        data: err
                    })
                } else {
                    next()
                }
            })
        } else {
            return res.json({
                success: 0,
                message: "Access denied!"
            })
        }
    }
}