const express = require("express")
const dotenv = require("dotenv")
const connectdb = require('./dbconnect/mongodb')
const userRouter = require("./routers/userRouters")

dotenv.config()

connectdb()


const app = express()
app.use(express.json())
app.use('/users', userRouter)

const PORT = process.env.PORT

app.listen(PORT, console.log(`server is listening on port: ${PORT}`))