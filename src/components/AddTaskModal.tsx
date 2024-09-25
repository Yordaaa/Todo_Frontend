// AddTaskModal.tsx
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import {
  useAddTaskMutation,
  useGetAllCollectionsQuery,
} from "../redux/Features/taskApiSlice";

interface AddTaskModalProps {
  showModal: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ showModal, onClose }) => {
  const {
    data: collectionsData,
    isLoading,
    isError,
  } = useGetAllCollectionsQuery();

  const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();

  const collections = collectionsData?.collections || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollectionId || !description || !date) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      await addTask({
        collectionId: selectedCollectionId,
        description,
        date,
      }).unwrap();

      toast.success("Task added successfully!");
      onClose(); 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error adding task. Please try again.");
    }
  };

  if (isLoading) return <p>Loading collections...</p>;
  if (isError) return <p>Error loading collections.</p>;

  return (
    <Modal
      show={showModal}
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
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="block w-full border p-1 rounded-md"
            required
          />
          <div className="flex gap-3">
            <select
              value={selectedCollectionId}
              onChange={(e) => setSelectedCollectionId(e.target.value)}
              className="block w-full border p-1 rounded-md"
              required
            >
              <option value="">Select a Collection</option>
              {collections.map((collection) => (
                <option key={collection._id} value={collection._id}>
                  {collection.collectionName}
                </option>
              ))}
            </select>
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
            className="w-fit px-5 bg-pink-400 text-gray-600 hover:opacity-90 transition-all duration-200 font-medium rounded-lg text-sm py-1 text-center"
            disabled={isAdding}
          >
            {isAdding ? "Adding Task..." : "Add Task"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;