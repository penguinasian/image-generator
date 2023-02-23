import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

const requireAuth = async (req, res, next) => { 

    const { authorization } = req.headers;
    console.log(authorization)

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token needed'})
    }

    const token = authorization.split(' ')[1]
    console.log(token)

    try {
        
        const  { email } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({error: 'Request is not authorized!'})
    }
}

export default requireAuth