import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    user: { 
        type: String,
        ref: 'User',
        required: true
    },
})

const imagePostSchema = mongoose.model('Image', imageSchema)
export default imagePostSchema