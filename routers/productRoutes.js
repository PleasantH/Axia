const Router = require('router');
const {createProduct} = require('../controllers/productController');


const productRouter = Router()


productRouter.post('/create', createProduct)




module.exports = productRouter