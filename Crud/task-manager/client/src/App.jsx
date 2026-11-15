import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

import TaskForm from "./components/task/TaskForm";
import TaskEditForm from "./components/task/TaskEditForm";
import TaskList from "./components/task/TaskList";
import EditButton from "./components/EditButton";
import DeleteButton from "./components/DeleteButton";

import {
  createTask,
  getTasks,
  updateTask as updateTaskAPI, // ✅ Naam change kiya taaki confuse na ho
  deleteTask,
} from "./services/taskapi";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial Data Fetch
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Add Task
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      setShowForm(false);
    } catch (err) {
      alert("Failed to add task");
    }
  };

  // Update Task (Fixed Logic)
  const handleUpdateTask = async (id, updatedData) => {
    try {
      const updatedTask = await updateTaskAPI(id, updatedData);

      // ✅ Sahi Logic: Sirf usi task ko update karo jiska ID match kare
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task)),
      );

      // ✅ Modal mein bhi naya data dikhao
      setSelectedTask(updatedTask);
    } catch (error) {
      console.error(error.message || "Failed to update task");
      throw error; // Error ko aage bhejo taaki EditForm dikha sake
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      setSelectedTask(null); // Details modal band karo
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Header */}
      <div className="mx-auto mt-8 max-w-4xl rounded-xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Task Manager</h1>
            <p className="mt-1 text-slate-500">Manage your daily tasks.</p>
          </div>
          <button
            className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} /> Add Task
          </button>
        </div>
      </div>

      {/* Add Task Modal */}
      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onAddTask={handleAddTask}
        />
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()} // Modal ke andar click karne pe band na ho
          >
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute right-4 top-4 text-slate-500 hover:text-slate-800"
            >
              <X size={20} />
            </button>

            <h2 className="mb-2 text-xl font-bold text-slate-800">
              {selectedTask.title}
            </h2>
            <p className="mb-4 text-slate-600">
              {selectedTask.description || "No description"}
            </p>

            <div className="border-t pt-4 text-sm text-slate-500 space-y-1">
              <p>
                <strong>Priority:</strong>{" "}
                <span className="capitalize">{selectedTask.priority}</span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{selectedTask.status}</span>
              </p>
            </div>

            {/* Edit / Delete Buttons */}
            <div className="mt-6 flex gap-3">
              <EditButton onClick={() => setShowEditForm(true)} />
              <DeleteButton
                onClick={() => handleDeleteTask(selectedTask._id)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditForm && selectedTask && (
        <TaskEditForm
          task={selectedTask}
          onClose={() => setShowEditForm(false)}
          onUpdateTask={handleUpdateTask}
        />
      )}

      {/* Task List */}
      <section className="mx-auto mt-8 max-w-4xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">All Tasks</h2>
          <span className="text-sm text-slate-500">{tasks?.length} tasks</span>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-10 text-center text-slate-500">Loading tasks...</p>
        ) : (
          <TaskList tasks={tasks} onTaskClick={setSelectedTask} />
        )}
      </section>
    </div>
  );
}

export default App;
