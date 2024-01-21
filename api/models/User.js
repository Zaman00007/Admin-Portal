import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        // required: true,
    },
    age: {
        type: Number,
        // required: true,
        min: 14,
        max: 85,
    },
    imagePath: {
        type: String,  
    },
    accept: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("User", UserSchema);
