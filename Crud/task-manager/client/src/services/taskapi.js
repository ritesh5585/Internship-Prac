
const API_URL = "http://localhost:3000/api/task";

// GET ALL TASKS
export const getTasks = async () => {
    const res = await fetch(API_URL);

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to fetch tasks");
    }

    return result.data;
};

// GET TASK BY ID
export const getTaskById = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to get task");
    }

    return result.data;
};

// CREATE TASK
export const createTask = async (taskData) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to create task");
    }

    return result.data;
};

// UPDATE TASK
export const updateTask = async (id, taskData) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to update task");
    }

    return result.data;
};

// DELETE TASK
export const deleteTask = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to delete task");
    }

    return result;
};
