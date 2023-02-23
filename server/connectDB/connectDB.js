import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true)
    
    mongoose.connect(url)
        .then(() => console.log("Connected to database"))
        .catch((error) => console.error(error.message))
}

export default connectDB