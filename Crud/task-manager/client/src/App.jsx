import { useState } from "react";
import { Plus } from "lucide-react";
import TaskForm from "./components/task/TaskForm";
import { createTask } from "./services/taskapi";

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = async (taskData) => {
    await createTask(taskData);
    setShowForm(false);
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

      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;
