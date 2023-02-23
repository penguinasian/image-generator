import express from 'express';
import connectDB from './connectDB/connectDB.js';
import dotenv from 'dotenv';
import dalleRoutes from './routes/dalleRoutes.js';
import imagePostRoutes from './routes/imagePostRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())
dotenv.config()


app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1/saveImage', imagePostRoutes)
app.use('/api/v1/user', userRoutes)

const startServer = async () => {

    try {

        connectDB(process.env.MONGO_URL)

        app.listen(PORT, () => {

            console.log(`Listening on ${PORT}`)
        })
    }
    catch (error) {
        console.error(error.message)
    }
}

startServer()
