import { useState } from "react";
import { SubtaskList } from "./SubTaskList";
import {
  useGetSubTasksQuery,
  useUpdateTaskStatusMutation,
} from "../redux/Features/taskApiSlice";
import AddSubTask from "./AddSubTask";
import { Modal } from "flowbite-react";
import EditTask from "./EditTask";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Task } from "../redux/Features/types";

interface TaskListProps {
  tasks: Task[] | undefined;
}

export const TaskList = ({ tasks }: TaskListProps) => {
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [isAddingSubtask, setIsAddingSubtask] = useState<string | null>(null);
  const [, setEditingTaskId] = useState<string | null>(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [showDate, setShowDate] = useState<Record<string, boolean>>({});
  const [taskId, setTaskId] = useState(""); // Changed variable name to avoid confusion

  const handleCheckboxChange = async (task: Task) => {
    const newStatus = !task.status;
    console.log("Updating task ID:", task._id);
    try {
      await updateTaskStatus({ id: task._id, status: newStatus }).unwrap();
    } catch (error) {
      console.error("Failed to update task status: ", error);
    }
  };

  const openModalForEdit = (task: Task) => {
    setCurrentTask(task);
    setEditingTaskId(task._id);
    setOpenTaskModal(true);
  };

  const openModalForAddSubtask = (task: Task) => {
    setCurrentTask(task);
    setIsAddingSubtask(task._id);
    setOpenTaskModal(true);
    setTaskId(task._id); // Set taskId here when a specific task is interacted with
  };

  // Toggle date visibility
  const toggleDateVisibility = (taskId: string) => {
    setShowDate((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const { data, isLoading: subtasksLoading } = useGetSubTasksQuery(taskId);

  return (
    <div>
      {tasks?.map((task) => (
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
                <div>
                  <MenuButton>
                    <i className="fas fa-edit"></i>
                  </MenuButton>
                </div>

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
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700">
                      Delete task
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
              <i
                className="fas fa-angle-down cursor-pointer ml-3"
                onClick={() => toggleDateVisibility(task._id)}
              ></i>
            </div>
          </div>
          {showDate[task._id] && (
            <p className="pt-2">
              <i className="fas fa-calendar ml-2"></i>
              {new Date(task.date).toLocaleDateString()}
            </p>
          )}

          {/* Render subtasks if available */}
          {subtasksLoading ? (
            <p>Loading subtasks...</p>
          ) : (
            <SubtaskList subtasks={data?.subtasks} />
          )}

          {/* Modal for adding subtask or editing task */}
          {openTaskModal && (
            <>
              <div className="" />
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
                  <div className="rounded mx-auto flex ">
                    {isAddingSubtask === currentTask?._id ? (
                      <div className="w-full">
                        <AddSubTask
                          taskId={currentTask._id}
                          onClose={() => {
                            setIsAddingSubtask(null);
                            setOpenTaskModal(false);
                          }}
                        />
                      </div>
                    ) : (
                      currentTask && (
                        <div className="w-full">
                          <EditTask
                            task={currentTask}
                            onClose={() => {
                              setEditingTaskId(null);
                              setOpenTaskModal(false);
                            }}
                          />
                        </div>
                      )
                    )}
                  </div>
                </Modal.Body>
              </Modal>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
