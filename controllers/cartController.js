const {Product, Cart} = require('../schema')


const createCart = async (req,res) => {
    try {
    const userId = req.userId; // From protect middleware
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'ProductId and quantity are required' });
    }

    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if cart already exists
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // No cart yet, create one
      cart = new Cart({
        userId,
        products: [{ productId, quantity }]
      });
    } else {
      // Cart exists, check if product already in cart
      const existingProductIndex = cart.products.findIndex(p =>
        p.productId.toString() === productId
      );

      if (existingProductIndex > -1) {
        // Product already in cart, update quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // New product, add to cart
        cart.products.push({ productId, quantity });
      }
    }

    const savedCart = await cart.save();
    res.status(201).json({ message: 'Cart updated', cart: savedCart });

  } catch (error) {
    console.error('Cart error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


module.exports = {createCart}