import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import TaskForm from "./components/task/TaskForm";
import { createTask, getTasks } from "./services/taskapi";
import TaskList from "./components/task/TaskList";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Fix: Start with true
  const [selectedTask, setSelectedTask] = useState(null); // Clicked task store karne ke liye
  const [tasks, setTasks] = useState([]);

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

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      // Fix: Bina refresh kiye naya task list me add karo
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setShowForm(false);
    } catch (err) {
      alert("Failed to add task");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-8 max-w-4xl rounded-xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Task Manager</h1>
            <p className="mt-1 text-slate-500">Manage your daily tasks.</p>
          </div>

          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onAddTask={handleAddTask}
        />
      )}

      {/* Task Details Modal (Jab card pe click hoga tab dikhega) */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl relative">
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              {selectedTask.title}
            </h2>
            <p className="text-slate-600 mb-4">
              {selectedTask.description || "No description"}
            </p>
            <div className="text-sm text-slate-500 border-t pt-4">
              <p>
                <strong>Priority:</strong>{" "}
                <span className="capitalize">{selectedTask.priority}</span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{selectedTask.status}</span>
              </p>
            </div>
          </div>
        </div>
      )}

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
