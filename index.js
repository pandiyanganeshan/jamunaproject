// require("dotenv").config();
import express from "express";
const app = express();
import cors from "cors";
import bodyParser from 'body-parser'
// import connection from "./db.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import mongoose from 'mongoose';
// database connection
// connection();

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.text())
// app.use(json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


mongoose.connect('mongodb+srv://Jamuna:Jamuna@cluster0.hv5j9.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('Connected to database successfully'))
.catch((e)=>console.log('Could not connect database!'))

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
