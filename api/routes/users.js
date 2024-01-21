import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyToken,verifyAdmin } from "../utils/verifyToken.js";
import User from "../models/User.js";

const router = express.Router();
const upload = multer();

router.get("/", verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    });

router.put("/updateUser/:id", verifyToken, async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }});

export default router;

