import mongoose from 'mongoose';

// Defining the schema for the user
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    token:{
        type: String,
        required: true,
    }
})

// Creating a schema for the user
const userPostSchema = mongoose.model('User', userSchema)

export default userPostSchema

