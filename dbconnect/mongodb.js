const mongoose = require("mongoose");

const connectdb = async () => {
try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('mongodb connected')
} catch (error) {
    console.log('mongodb disconnected', error)
}
}

module.exports = connectdb