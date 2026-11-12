import mongoose from "mongoose";

const tashSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500,
            default: ""
        },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending"
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        }
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model('Task', tashSchema)
export default Task