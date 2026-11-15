import React from "react";
import { Pencil } from "lucide-react";

const EditButton = ({onClick}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      <Pencil size={16} />
      Edit
    </button>
  );
};

export default EditButton;
