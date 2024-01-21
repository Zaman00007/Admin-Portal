import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.json({message : "Hello! I am Backend!"});
});

app.use("/users", userRoute);

app.use("/auth", authRoute);


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

