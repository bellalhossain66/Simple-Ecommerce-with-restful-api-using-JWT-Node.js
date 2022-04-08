const { verify } = require('jsonwebtoken')

module.exports = function(app) {
    app.get('/app', (req, res) => {
        res.json([{
            "success": '1',
            "message": "api is working on port: " + process.env.APP_PORT
        }])
    })
    app.get('/', (req, res) => {
        const jwtoken = req.cookies.jwtoken
        if (jwtoken != undefined && req.cookies.loginCheck == 'true') {
            verify(jwtoken, process.env.JWT_USER_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('jwtoken')
                    res.clearCookie('loginCheck')
                    res.render('index.ejs', {
                        title: "Bellal"
                    })
                } else {
                    res.render('index.ejs', {
                        title: 'Ecommerce Website',
                        email: decoded.email,
                        first_name: decoded.first_name,
                        last_name: decoded.last_name,
                        loginCheck: req.cookies.loginCheck
                    })
                }
            })
        } else {
            res.render('index.ejs', {
                title: "Bellal"
            })
        }
    })
    app.get('/login', (req, res) => {
        const jwtoken = req.cookies.jwtoken
        if (jwtoken != undefined && req.cookies.loginCheck == 'true') {
            res.redirect('/')
        } else {
            res.render('login.ejs')
        }
    })
    app.get('/registration', (req, res) => {
        const jwtoken = req.cookies.jwtoken
        if (jwtoken != undefined && req.cookies.loginCheck == 'true') {
            res.redirect('/')
        } else {
            res.render('registration.ejs')
        }
    })
    app.get('/user-logout', (req, res) => {
        res.clearCookie('jwtoken')
        res.clearCookie('loginCheck')
        res.redirect('/')
    })
    app.get('/admin-login', (req, res) => {
        const jwtoken = req.cookies.jwtoken
        if (jwtoken != undefined && req.cookies.loginCheck == 'true') {
            res.redirect('/admin')
        } else {
            res.render('admin/login.ejs')
        }
    })
    app.get('/admin', (req, res) => {
        const jwtoken = req.cookies.jwtoken
        if (jwtoken != undefined && req.cookies.loginCheck == 'true') {
            verify(jwtoken, process.env.JWT_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('jwtoken')
                    res.clearCookie('loginCheck')
                    res.redirect('/admin-login')
                } else {
                    res.render('admin/index.ejs', {
                        title: 'Admin',
                        email: decoded.email,
                        first_name: decoded.first_name,
                        last_name: decoded.last_name
                    })
                }
            })
        } else {
            res.redirect('/admin-login')
        }
    })
    app.get('/add-product', (req, res) => {
        const jwtoken = req.cookies.jwtoken
        if (jwtoken != undefined && req.cookies.loginCheck == 'true') {
            verify(jwtoken, process.env.JWT_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('jwtoken')
                    res.clearCookie('loginCheck')
                    res.redirect('/admin-login')
                } else {
                    res.render('admin/add-product.ejs', {
                        title: 'Add product',
                        email: decoded.email,
                        first_name: decoded.first_name,
                        last_name: decoded.last_name
                    })
                }
            })
        } else {
            res.redirect('/admin-login')
        }
    })
    app.get('/product-list', (req, res) => {
        const jwtoken = req.cookies.jwtoken
        if (jwtoken != undefined && req.cookies.loginCheck == 'true') {
            verify(jwtoken, process.env.JWT_TOKEN, (err, decoded) => {
                if (err) {
                    res.clearCookie('jwtoken')
                    res.clearCookie('loginCheck')
                    res.redirect('/admin-login')
                } else {
                    res.render('admin/product-list.ejs', {
                        title: 'Product List',
                        email: decoded.email,
                        first_name: decoded.first_name,
                        last_name: decoded.last_name
                    })
                }
            })
        } else {
            res.redirect('/admin-login')
        }
    })
    app.get('/admin-logout', (req, res) => {
        res.clearCookie('jwtoken')
        res.clearCookie('loginCheck')
        res.redirect('/admin-login')
    })
}