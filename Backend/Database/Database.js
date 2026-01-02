import mongoose from "mongoose";

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected Successfully")

    }
    catch (err) {
        console.log("Database Connection failed , error is : ", err.message)
    }
}

export default connectDB