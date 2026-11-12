import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import Taskroute from "./routes/taskRoutes.js"
import database from "./config/db.js"
import errorMiddleware from "./middleware/errorMiddleware.js"

await database()

const app = express()

app.use(express.json())
app.use(errorMiddleware)
app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use("/api/task", Taskroute)

app.listen(3000, ()=> {
    console.log("server is running on port 3000")})