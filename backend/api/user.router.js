const { productView, userRegistration, userLogin } = require('./user.controller')
const router = require('express').Router()

router.get('/fetch-product', productView)
router.post('/create-user', userRegistration)
router.post('/login', userLogin)

module.exports = router