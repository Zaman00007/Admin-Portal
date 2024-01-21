import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import adminRoute from "./routes/admin.js";
import authRoute from "./routes/auth.js";
import cors from "cors";
import userRoute from "./routes/users.js";
import multer from "multer";
import path from "path";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use((err, req, res, next) => {
    console.log("Hello from middleware");
  next();
});

const storage = multer.diskStorage({
    destination: './uploads/', // Specify the directory where uploaded files will be stored
    filename: function (req, file, callback) {
        // Create a unique filename by appending the current timestamp to the original name
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
    // 'image' is the field name in the form for file input
    res.json({ message: 'File uploaded successfully' });
});

app.get("/", (req, res) => {
  res.json({message : "Hello! I am Backend!"});
});

app.use("/admin", adminRoute);

app.use("/auth", authRoute);

app.use("/user", userRoute);


const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO, {useNewUrlParser: true,
          useUnifiedTopology: true,
      } );
        console.log("Connected to MongoDB.")
      } catch (error) {
        console.log("Error connecting to MongoDB");
        console.log(error);
      }

};

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected!")
})

mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected!")
})

app.listen(8800, () => {
    connect();
  console.log("Server started on port 8800");
})

