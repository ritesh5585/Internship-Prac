import { useState } from "react";
import { X, Save } from "lucide-react"; // Fixed: Save icon import kiya

const TaskEditForm = ({ task, onClose, onUpdateTask }) => {
  // Alag-alag state, jisse samajhna aasan hai
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "medium");
  const [status, setStatus] = useState(task.status || "pending");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Saara data ek object mein banakar bhej diya
      await onUpdateTask(task._id, {
        title,
        description,
        priority,
        status,
      });

      onClose(); // Fixed: capital 'C'
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    } finally {
      setLoading(false); // Loading hamesha band hogi
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-800"
        >
          <X size={20} />
        </button>

        <h2 className="mb-5 text-xl font-bold text-slate-800">Edit Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Direct update
              required
              minLength={2}
              maxLength={100}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="mb-1 block text-sm font-medium">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditForm;
