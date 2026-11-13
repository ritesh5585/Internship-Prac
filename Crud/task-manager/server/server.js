import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import Taskroute from "./routes/taskRoutes.js"
import database from "./config/db.js"
import errorMiddleware from "./middleware/errorMiddleware.js"
import morgan from "morgan"


const app = express()
await database()

app.use(express.json())
app.use(errorMiddleware)
app.use(morgan("dev"))
app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use("/api/task", Taskroute)

app.listen(3000, ()=> {
    console.log("server is running on port 3000")})