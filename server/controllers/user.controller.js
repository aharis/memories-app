import bcrypt from 'bcryptjs';//hashed password
import jwt from 'jsonwebtoken';

import User from "../models/user.model.js";


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const logedUser = await User.findOne({ email });
        if (!logedUser) return res.status(404).json({ message: 'User doesn\'t exist!' })
        const passwordCorect = await bcrypt.compare(password, logedUser.password)
        if (!passwordCorect) return res.status(400).json( 'Invalid credentialS!' )
        const token = jwt.sign({ email: logedUser.email, id: logedUser._id }, process.env.jwtSecret, { expiresIn: "1h" })//usualy stored in env file
        res.status(200).json({ result: logedUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const newUser = await User.findOne({ email });
        if (newUser) return res.status(400).json({message: 'User alredy exist!' })
        if (password !== confirmPassword) return res.status(400).json({ message: 'Password don\'t match!' })
        const hashedPasswort = await bcrypt.hash(password, 12) //12 is solt levelof dificulte hash password
        const user = await User.create({ name, email, password: hashedPasswort })
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.jwtSecret, { expiresIn: "1h" })
        res.status(200).json({ result: user, token })

    } catch (error) {
        res.status(501).json({ message: 'Something went wrong.' })
    }
}