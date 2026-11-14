import { CalendarDays, CheckCircle2 } from "lucide-react";

function TaskCard({ task, onClick }) {
  const priorityStyles = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition"
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
            priorityStyles[task.priority] || priorityStyles.medium
          }`}
        >
          {task.priority}
        </span>

        {task.status === "completed" ? (
          <CheckCircle2 className="text-green-600" size={20} />
        ) : (
          <span className="text-xs text-slate-500">Pending</span>
        )}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-slate-800">
        {task.title}
      </h3>

      <p className="mb-4 line-clamp-2 text-sm text-slate-500">
        {task.description || "No description available"}
      </p>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="flex items-center gap-2 text-xs text-slate-400">
          <CalendarDays size={15} />
          {new Date(task.createdAt).toLocaleDateString()}
        </span>

        <span className="text-xs font-medium capitalize text-slate-600">
          {task.status}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;