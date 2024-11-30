import { useState } from "react";
import {
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} from "../redux/Features/taskApiSlice";
import AddSubTask from "./AddSubTask";
import { Modal } from "flowbite-react";
import EditTask from "./EditTask";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Subtask, Task, TaskListProps } from "../redux/Features/types";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";

export const TaskList = ({ tasks }: TaskListProps) => {
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation(); // Add delete task mutation
  const [isAddingSubtask, setIsAddingSubtask] = useState<string | null>(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [showSubtasks, setShowSubtasks] = useState<Record<string, boolean>>({});

  // Handle task checkbox status change
  const handleCheckboxChange = async (task: Subtask) => {
    const newStatus = !task.status;
    try {
      await updateTaskStatus({ id: task._id, status: newStatus }).unwrap();
      toast.success("Task status updated successfully!");
    } catch (error) {
      console.error("Failed to update task status: ", error);
    }
  };

  // Open modal for editing task
  const openModalForEdit = (task: Task | Subtask) => {
    setCurrentTask(task as Task);
    setOpenTaskModal(true);
  };

  // Open modal for adding subtask
  const openModalForAddSubtask = (task: Task | Subtask) => {
    setCurrentTask(task as Task);
    setIsAddingSubtask(task._id);
    setOpenTaskModal(true);
  };

  // Handle deleting a task
  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId).unwrap();
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task: ", error);
      toast.error("Failed to delete task!");
    }
  };

  // Toggle subtask visibility
  const toggleSubtaskVisibility = (taskId: string) => {
    setShowSubtasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Recursive function to render tasks and their subtasks
  const renderTasks = (tasksToRender: Subtask[]) => {
    return (
      <>
        {tasksToRender.map((task) => (
          <div key={task._id} className="p-3 mb-2 dark:text-gray-200">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="rounded-md dark:bg-gray-800 border-gray-500"
                  checked={task.status}
                  onChange={() => handleCheckboxChange(task)}
                />
                <p
                  style={{
                    textDecoration: task.status ? "line-through" : "none",
                  }}
                >
                  {task.description}
                </p>
              </div>
              <div>
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton>
                    <i className="fas fa-edit"></i>
                  </MenuButton>

                  <MenuItems
                    transition
                    className="p-3 absolute right-0 z-10 mt-2 w-[140px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                  >
                    <MenuItem>
                      <button
                        onClick={() => openModalForAddSubtask(task)}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                      >
                        Add Subtask
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => openModalForEdit(task)}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                      >
                        Edit task
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleDeleteTask(task._id)} // Handle task deletion
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                      >
                        Delete task
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
                <i
                  className="fas fa-angle-down cursor-pointer ml-3"
                  onClick={() => toggleSubtaskVisibility(task._id)}
                ></i>
              </div>
            </div>

            {/* Render subtasks if available */}
            {showSubtasks[task._id] && (
              <>
                <p className="pt-2">
                  <i className="fas fa-calendar mx-2"></i>
                  {formatDistanceToNow(new Date(task.date), {
                    addSuffix: true,
                  })}
                </p>
                <div className="ml-5">
                  {task?.subtasks && task?.subtasks.length > 0
                    ? renderTasks(task?.subtasks) // Recursive call to render subtasks
                    : ""}
                </div>
              </>
            )}

            {/* Modal for adding sub-task or editing task */}
            {openTaskModal && (
              <Modal
                show={openTaskModal}
                position="center"
                onClose={() => setOpenTaskModal(false)}
                className="w-1/4 bg-white dark:bg-gray-700 h-fit mx-auto mt-40"
              >
                <button
                  onClick={() => setOpenTaskModal(false)}
                  className="absolute top-0 right-0 text-3xl text-gray-500"
                >
                  &times;
                </button>

                <Modal.Body className="w-full mx-auto">
                  {/* Render modal content based on whether adding a sub-task or editing a task */}
                  {isAddingSubtask === currentTask?._id ? (
                    <AddSubTask
                      taskId={currentTask._id}
                      onClose={() => {
                        setIsAddingSubtask(null);
                        setOpenTaskModal(false);
                      }}
                    />
                  ) : (
                    currentTask && (
                      <EditTask
                        task={currentTask}
                        onClose={() => {
                          setOpenTaskModal(false);
                        }}
                      />
                    )
                  )}
                </Modal.Body>
              </Modal>
            )}
          </div>
        ))}
      </>
    );
  };

  // Ensure tasks is an array before rendering
  return (
    <div>
      {renderTasks(Array.isArray(tasks) ? tasks : [])}{" "}
      {/* Call the recursive function to render tasks */}
    </div>
  );
};
