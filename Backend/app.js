import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./Database/Database.js"
import contactRoute from "./Routes/ContactRoute.js"


const app = express()

dotenv.config()
connectDB()

app.use(express.json())

app.use(cors())

app.use("/api/contact",contactRoute)


const PORT = process.env.PORT

app.listen(PORT , ()=>{
    console.log("Server started at PORT number " ,PORT)
})
