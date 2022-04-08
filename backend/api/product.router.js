const { productInsert, productView, productRemove, productSearchBy, productDetailById, productUpdateById } = require('./product.controller')
const router = require('express').Router()
const { checkToken } = require('../auth/token_validation')

router.post('/add-product', checkToken, productInsert)
router.get('/get-product', checkToken, productView)
router.delete('/delete-product', checkToken, productRemove)
router.post('/search-product/', checkToken, productSearchBy)
router.get('/detail/:id', checkToken, productDetailById)
router.patch('/update-product', checkToken, productUpdateById)

module.exports = router