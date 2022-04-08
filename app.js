require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const adminRouter = require('./backend/api/api.router')
const productRouter = require('./backend/api/product.router')
const userRouter = require('./backend/api/user.router')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use('/api/admin', adminRouter)
app.use('/api/product', productRouter)
app.use('/user', userRouter)

require('./backend/api/index')(app)

app.listen(process.env.APP_PORT, () => {
    console.log('server is running on port:', process.env.APP_PORT)
})