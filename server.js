const express = require("express")
const dotenv = require("dotenv")
const connectdb = require('./dbconnect/mongodb')
const {userRouter, productRouter, cartRouter} = require("./routers")


dotenv.config()

connectdb()


const app = express()
app.use(express.json())
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/carts', cartRouter)

const PORT = process.env.PORT

app.listen(PORT, console.log(`server is listening on port: ${PORT}`))