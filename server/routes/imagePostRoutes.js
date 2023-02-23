import mongoose from "mongoose";
import imagePostSchema from "../connectDB/Models/imageSchema.js";
import dotenv from 'dotenv';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary'
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router()
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

router.use(requireAuth)

router.get('/', async (req, res) => { 
    try {
        const response = await imagePostSchema.find({})
        console.log(response)
        res.status(200).json({ response })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: error.message })
    }
})

router.post('/', async (req, res) => {

    const { photo, name, prompt, email } = req.body
    try {

        // upload to cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo)
        console.log("PhotoUrl", photoUrl)

        console.log(photoUrl)     

        // save to db
        const response = await imagePostSchema.create({ 
            name: name,
            prompt: prompt,
            photo: photoUrl.url,
            user: email,
         })

        res.status(201).send({ response })


    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: error.message })
    }
})


export default router