import { Router } from "express";
import { createTask, deleteTask, getTask, getTaskById, updateTask } from "../controllers/taskController.js";

const router = Router()

router.get("/", getTask) // get all task
router.get("/:id", getTaskById) // get task by id
router.post("/", createTask) // create task
router.delete("/:id", deleteTask) // delete task
router.put("/:id", updateTask) // update task

export default router