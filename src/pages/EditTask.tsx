// EditTask.tsx
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { useEditTaskMutation } from "../redux/Features/taskApiSlice";
import { EditTaskProps } from "../redux/Features/types";

const EditTask: React.FC<EditTaskProps> = ({ task, onClose }) => {
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(
    new Date(task.date).toISOString().split("T")[0]
  );

  const [updateTask] = useEditTaskMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !date) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      await updateTask({ id: task._id, description, date }).unwrap();
      toast.success("Task updated successfully!");
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error updating task. Please try again.");
    }
  };

  return (
    <Modal
      show={true}
      onClose={onClose}
      className="w-1/3 bg-white dark:bg-gray-700 h-fit mx-auto mt-40"
    >
      <button
        onClick={onClose}
        className="absolute top-0 right-0 text-3xl text-gray-500"
      >
        &times;
      </button>
      <Modal.Body className="w-full mx-auto">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Edit task description"
            required
            className="block w-full border p-1 mb-2 rounded-md"
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="block w-full border p-1 rounded-md"
          />
          <button
            type="submit"
            className="w-fit px-5 bg-pink-400 text-gray-600 hover:opacity-90 transition-all duration-200 font-medium rounded-lg text-sm py-1 text-center mt-2"
          >
            Update Task
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTask;
