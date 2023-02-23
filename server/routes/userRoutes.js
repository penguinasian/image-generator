import express from 'express';
import {registerUser, loginUser, signOutUser } from '../Controller/userController.js';


// Defining the user controller
const router = express.Router();

// Registering a user
router.post('/signup', registerUser);

// Logging in a user
router.post('/login', loginUser);

// Signing out a user
router.post('/signout', signOutUser);

export default router;