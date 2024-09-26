import { useState } from "react";
import { useAddSubtaskMutation } from "../redux/Features/taskApiSlice"; // Adjust the import as needed
import { toast } from "react-toastify";
import { AddSubTaskProps } from "../redux/Features/types";

const AddSubTask: React.FC<AddSubTaskProps> = ({ taskId, onClose }) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [addSubtask, { isLoading }] = useAddSubtaskMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log({ taskId, onClose });
      console.log({ taskId, description, date });
      await addSubtask({ taskId, description, date }).unwrap();
      toast.success("Subtask added successfully!");
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error adding subtask. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Subtask description"
          className="block w-full border p-1 rounded-md text-gray-800"
          required
        />
      </div>
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full border p-1 rounded-md text-gray-800"
          required
        />
      </div>
      <button
        type="submit"
        className="w-fit text-gray-700 bg-pink-400 hover:opacity-90 transition-all duration-200 font-medium rounded-lg text-sm px-5 py-1"
        disabled={isLoading}
      >
        {isLoading ? "Adding Subtask..." : "Add Subtask"}
      </button>
    </form>
  );
};

export default AddSubTask;
