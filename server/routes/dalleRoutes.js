
import dotenv from 'dotenv';
import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import requireAuth from '../middleware/requireAuth.js';

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const router = express.Router()

router.use(requireAuth)

router.post('/', async (req, res) => {

    // let prompt = req.body.prompt
    // let n = req.body.n
    // let size = req.body.size

    // const { prompt, n, size } = req.body
    try {

        const { prompt } = req.body

        console.log(prompt)

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            // response_format: 'b64_json',
        })

        const image = aiResponse.data.data[0].url
        console.log(image)

        res.status(200).json({ photo: image })

    } catch (error) {
        console.error(error.message)
        res.status(500).send({error: error.message})
    }
})



export default router

