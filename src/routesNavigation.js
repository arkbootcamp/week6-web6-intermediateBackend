const router = require('express').Router()

const product = require('./routes/product')
const category = require('./routes/category')

router.use('/product', product) // http://localhost:3000/product
router.use('/category', category) // http://localhost:3000/category

module.exports = router
