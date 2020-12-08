const { getProductModel } = require('../model/product')
const helper = require('../helper/response')

module.exports = {
  getProduct: async (request, response) => {
    try {
      const result = await getProductModel()
      return helper.response(response, 200, 'Success Get Product', result)
      // response.status(200).send(result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postProduct: (request, response) => {
    // request.body = form input
    // request.params = delete, update data
    // request.query = search, sort, pagination
    // console.log(request.body)
    // console.log(request.query)
    // console.log(request.params)
  }
}
