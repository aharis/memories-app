import express from 'express';
import {createUser, loginUser } from '../controllers/user.controller.js';

const router = express.Router();

//user
router.post('/signup', createUser)
router.post('/signin', loginUser)

export default router;