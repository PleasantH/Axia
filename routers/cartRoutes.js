const Router = require('router');
const {createCart} = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

const cartRouter = Router()


cartRouter.post('/create', authMiddleware, createCart)




module.exports = cartRouter