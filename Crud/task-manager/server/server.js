import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import Taskroute from "./routes/taskRoutes.js"
import database from "./config/db.js"

await database()

const app = express()

app.use

app.use("/api/task", Taskroute)

app.listen(3000, ()=> {
    console.log("server is running on port 3000")})