const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const {
  getProduct,
  getProductById,
  postProduct,
  patchProduct
} = require('../controller/product')

router.get('/', authorization, getProduct) // http://localhost:3000/product
router.get('/:id', getProductById) // http://localhost:3000/product/1
router.post('/', postProduct)
router.patch('/:id', patchProduct)

module.exports = router
