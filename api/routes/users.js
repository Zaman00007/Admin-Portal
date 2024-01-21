import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
 

const router = express.Router();
const upload = multer();

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    });

router.post('/signup', upload.single('profilePic'), async (req, res) => {
    try {
        const { username, password, gender, age } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password , salt);
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = new User({username: username, password: hash, gender :gender, age : age, });
        if (req.file) {
            const profilePicBuffer = req.file.buffer;
            const profilePicBase64 = profilePicBuffer.toString('base64');
            newUser.profilePic = profilePicBase64;
        }
        await newUser.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;