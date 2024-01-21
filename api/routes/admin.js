import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import jwt from "jsonwebtoken";
import { verifyToken,verifyAdmin } from "../utils/verifyToken.js";
 

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

router.get("/check", verifyToken, (req, res, next) => {
    res.json({message : "Congo you are logged in!!!"});
  })


router.get("/checkAdmin", verifyAdmin, (req, res, next) => {
    res.json({message : "Congo you are Admin !!!"});
  })

router.delete("/deleteUser/:id", verifyAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    });

router.get("/getUser/:id", verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    });

router.put("/updateUser/:id", verifyAdmin, async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }});

export default router;