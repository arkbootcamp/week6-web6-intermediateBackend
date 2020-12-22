const router = require('express').Router()

const product = require('./routes/product')
const category = require('./routes/category')
const user = require('./routes/user')

router.use('/product', product) // http://localhost:3000/product
router.use('/category', category) // http://localhost:3000/category
router.use('/user', user)

module.exports = router
