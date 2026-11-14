import TaskCard from "./TaskCard";

function TaskList({ tasks, onTaskClick }) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <h3 className="text-lg font-semibold text-slate-700">No tasks yet</h3>
        <p className="mt-2 text-sm text-slate-500">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id || task.id} // Safe fallback
          task={task}
          onClick={() => onTaskClick(task)} // Yahan click hone pe App.jsx ko task bhej raha hai
        />
      ))}
    </div>
  );
}

export default TaskList;
