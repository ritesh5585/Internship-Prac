import mongoose from "mongoose";
import TaskSchema from "../models/Task.js"

export const createTask = async (req, res) => {
    try {
        const { title, description, priority } = req.body
        if (!title || !priority)
            return res.status(400).json({
                success: false,
                message: "Task title is required"
            });

        const task = await TaskSchema.create({
            title,
            description,
            priority
        })

        return res.status(200).json({
            success: true,
            message: "Task created successfully",
            data: task
        })

    } catch (error) {
        console.error(error)
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await TaskSchema.find().sort({ createdAt: -1 })

        res.status(200).json({
            message: "task fetched",
            success: true,
            count: task.length,
            data: task
        })
    } catch (error) {
        console.log(error)
    }
}

export const getTaskById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
            success: false,
            message: "Invalid task ID"
        });

    const task = await TaskSchema.findById(id)

}