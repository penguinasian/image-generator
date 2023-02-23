import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userPostSchema from "../connectDB/Models/userSchema.js";
import { validatePassword } from "../utils/index.js";

// Defining the user controller

const registerUser = async (req, res) => { 

    const { username, password, email } = req.body;

    try {
        
        // Validate the password
        if (!validatePassword(password)) { 
            return res.status(409).json({message: "Password length needs to be greater than 4!"});
        }

        // Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a token
        const token = jwt.sign({email: email}, process.env.JWT_SECRET_KEY, {expiresIn: "1 day"});

        // Check if the user already exists
        const user = await userPostSchema.find({email: email});
        if (user.length > 0) { 
            return res.status(409).json({message: "User already exists!"});
        }

        // Create a new user
        const response = await new userPostSchema({username, password:hashedPassword, email, token}).save();
        console.log(response)
        res.status(201).json({email, token});

    } catch (error) {

        console.error(error);
        res.status(409).json({message: error.message});
    }
}

const loginUser = async (req, res) => { 

    const { email, password } = req.body;


    try {
        
        // Check if the user exists
        const user = await userPostSchema.find({email: email});
        console.log(user)
        if (user.length === 0) { 
            throw new Error("User does not exist!");
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
        console.log("isPasswordCorrect", isPasswordCorrect)

        if (!isPasswordCorrect) { 
            throw new Error("Invalid credentials!");
        }

        const token = jwt.sign({email: email}, process.env.JWT_SECRET_KEY, {expiresIn: "1 day"});
        const updateUserWithToken = await userPostSchema.findOneAndUpdate({email: email}, {token: token}, {new: true});
        console.log(updateUserWithToken)
        res.status(200).json({email, token});

    } catch (error) {
        res.status(401).json({message: error.message})
        console.error(error);
    }
}

const signOutUser = async (req, res) => { 

    const { email } = req.body;
    try {
        
        const response = await userPostSchema.findOneAndUpdate({email: email}, {token: ""}, {new: true});
        console.log(response)
        res.status(200).json(response);

    } catch (error) {
        console.error(error);
    }
}


export { registerUser, loginUser, signOutUser }