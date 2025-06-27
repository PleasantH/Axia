const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
}, {timestamps: true})


const Product = mongoose.model("product", productSchema);
module.exports = Product;
