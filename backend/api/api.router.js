const { createUser, fetchAdminById, loginAdmin } = require('./api.controller')
const router = require('express').Router()
const { checkToken } = require('../auth/token_validation')

router.post('/', createUser)
router.get('/:id', checkToken, fetchAdminById)
router.post('/login', loginAdmin)

module.exports = router