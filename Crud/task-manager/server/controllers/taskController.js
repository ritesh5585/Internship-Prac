import mongoose from "mongoose";
import TaskSchema from "../models/Task.js"

export const createTask = async (req, res, next) => {
    try {
        const { title, description, priority } = req.body
        if (!title || !priority)
            return res.status(400).json({
                success: false,
                message: "Task title or priority is required"
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
        next(error)
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
    try {


        const { id } = req.params

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({
                success: false,
                message: "Invalid task ID"
            });

        const task = await TaskSchema.findById(id)

        if (!task)
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error(error)
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID"
            });
        }

        const allowedFields = [
            "title",
            "description",
            "status",
            "priority"
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (
            updates.title !== undefined &&
            (typeof updates.title !== "string" ||
                !updates.title.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Title cannot be empty"
            });
        }

        if (updates.title !== undefined) {
            updates.title = updates.title.trim();
        }

        const task = await TaskSchema.findByIdAndUpdate(
            id,
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });

    } catch (error) {
        console.error(error)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID"
            });
        }

        const task = await TaskSchema.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error(error)
    }
}