import { useState } from "react";
import { useEditTaskMutation } from "../redux/Features/taskApiSlice";
import { toast } from "react-toastify";
import { EditTaskInputProps, EditTaskProp } from "../redux/Features/types";



const EditTask: React.FC<EditTaskProp> = ({ task, onClose }) => {
  const [description, setDescription] = useState<string>(task.description);
  const [date, setDate] = useState<string>(task.date.split("T")[0]);

  const [editTask, { isLoading }] = useEditTaskMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedTaskData: EditTaskInputProps = {
      id: task._id,
      description,
      date: new Date(date).toISOString(),
    };

    try {
      await editTask(updatedTaskData).unwrap();
      toast.success("Task updated successfully!");
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border p-1 rounded-md"
            required
          />
        </div>
        <div className="py-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full border p-1 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-fit text-gray-700 bg-pink-400 hover:opacity-90 transition-all duration-200 font-medium rounded-lg text-sm px-5 py-1"
        >
          {isLoading ? "Updating..." : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default EditTask;