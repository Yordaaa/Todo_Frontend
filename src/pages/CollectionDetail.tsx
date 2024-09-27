import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetUserTaskByIdQuery } from "../redux/Features/taskApiSlice";
import { TaskList } from "./TaskList";
import Sidenav from "../components/Sidenav";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Features/selector";
import {
  useAddfavouriteMutation,
  useGetUserfavouriteQuery,
  useRemoveFromfavouriteMutation,
} from "../redux/Features/userApiSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import AddTaskModal from "../components/AddTaskModal";

function CollectionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser);
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(
    undefined
  );

  const {
    data: collectionTasks,
    isLoading
  } = useGetUserTaskByIdQuery(id as string, {});

  const [addfavourite] = useAddfavouriteMutation();
  const [removeFromfavourite] = useRemoveFromfavouriteMutation();
  const { data: favouriteData } = useGetUserfavouriteQuery(userInfo?._id);

  const handleAddfavourite = async () => {
    if (!userInfo) {
      navigate("/");
      return;
    }

    try {
      await addfavourite({ collectionId: id }).unwrap();
      toast.success("Added to favourites");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Unexpected error occurred while adding to favourites");
    }
  };

  const handleRemoveFromfavourite = async () => {
    if (!userInfo) {
      navigate("/");
      return;
    }

    try {
      await removeFromfavourite({ collectionId: id }).unwrap();
      toast.success("Removed from favourites");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Unexpected error occurred while removing from favourites");
    }
  };

  const handleAddSubtask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setOpenTaskModal(true);
  };

  const isInfavourite = favouriteData?.favourite?.some(
    (item) => item._id === id
  );

  // Function to count completed tasks
  const countCompleteTasks = () => {
    return collectionTasks?.tasks.filter((task) => !task.status).length || 0;
  };
  const Tasks = () => {
    return collectionTasks?.tasks.filter((task) => task.status).length || 0;
  };


  // Extract collection name safely
  const collectionName =
    collectionTasks?.collectionName || "Unnamed Collection";

  return (
    <>
      {isLoading ? (
        <p>Loading tasks...</p>
      ):(
        <div key={id}>
          <section className="flex max-w-screen-2xl mx-auto p-5 min-h-screen">
            <div className="w-fit">
              <Sidenav />
            </div>
            <div className="max-w-screen-md mx-auto w-full">
              <div className="flex gap-3 m-5 items-center">
                <Link
                  to="/collections"
                  className="fas fa-less-than bg-pink-400 py-1 px-2 text-gray-800 rounded text-xs"
                ></Link>
                <h1 className="text-2xl font-bold dark:text-white">
                  {collectionName}
                </h1>
                {isInfavourite ? (
                  <button
                    onClick={handleRemoveFromfavourite}
                    className={`fas fa-heart text-2xl ${
                      isInfavourite ? "text-red-600" : ""
                    }`}
                  ></button>
                ) : (
                  <button
                    onClick={handleAddfavourite}
                    className="far fa-heart text-2xl hover:text-red-600 text-gray-800 dark:text-gray-200 mr-2"
                  ></button>
                )}
              </div>

              <div className="flex gap-3 items-center ml-7 shadow shadow-b-md pb-3">
                <button
                  onClick={() => setOpenTaskModal(true)}
                  className="fas fa-plus bg-pink-500 text-white text-xs rounded shadow-sm p-1 px-2"
                ></button>
                <p className="text-sm font-bold dark:text-white">Add Task</p>
              </div>
              <h2 className="ml-6 pt-2 dark:text-white">
                Tasks - {countCompleteTasks()}
              </h2>

              <div className="ml-10">
                {collectionTasks?.tasks.length === 0 ? (
                  <div className="flex justify-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/5058/5058432.png"
                      alt="No tasks"
                      className="h-40 m-10"
                    />
                  </div>
                ) : (
                  <TaskList
                    tasks={
                      collectionTasks?.tasks.filter((task) => !task.status) ||
                      []
                    }
                    onAddSubtask={handleAddSubtask}
                    task={null}
                  />
                )}
              </div>

              <div className="pt-20 px-10">
                <h1 className="font-bold dark:text-gray-200 text-xl pb-3">
                  Completed - {Tasks()}
                </h1>

                <TaskList
                  tasks={
                    collectionTasks?.tasks.filter((task) => task.status) || []
                  }
                  onAddSubtask={handleAddSubtask}
                  task={null}
                />
              </div>
            </div>
          </section>

          <AddTaskModal
            showModal={openTaskModal}
            onClose={() => {
              setOpenTaskModal(false);
              setSelectedTaskId(undefined);
            }}
            collectionId={id}
            taskId={selectedTaskId}
          />
        </div>
      )}
    </>
  );
}

export default CollectionDetails;
