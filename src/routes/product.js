const router = require('express').Router()
const { getProduct, postProduct } = require('../controller/product')
// const product = require('../controller/product')

router.get('/', getProduct)
router.post('/', postProduct)

// router.get('/product', (request, response) => {
//   const data = {
//     data: [
//       {
//         product_id: 1,
//         product_name: 'Meja',
//         product_status: 1
//       }
//     ]
//   }
//   response.status(200).send(data)
// })

module.exports = router
