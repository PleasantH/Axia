const Product = require('../schema/productSchema')
const User = require('../schema/userSchema')


const createProduct = async (req,res) => {
    try {
        const {userId, name, price, color, size, imgUrl} = req.body
        if (!userId || !name || !price || !color || !size || !imgUrl) {
            return res.status(400).json({message: "Please fill all fields"})
        }
        console.log("Creating product with userId:", userId)
        const existingUser = await User.findById(userId)
        if (!existingUser) {
            return res.status(400).json({message: "User doesn't exist"})
        }
        console.log("Creating product with name:", name)
        const newProduct = new Product({
            userId,
            name,
            price,
            color,
            size,
            imgUrl
        })
        console.log("New product created:", newProduct)
        const savedProduct = await newProduct.save()
        console.log("Product saved successfully:", savedProduct)
         // Check if the product was saved successfully
        res.status(200).json(savedProduct, {message: "Products created"})
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}


module.exports = {createProduct}