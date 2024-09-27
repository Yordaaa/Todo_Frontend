import { Link, NavLink } from "react-router-dom";
import {
  useGetAllCollectionsQuery,
  useGetUserTaskQuery,
} from "../redux/Features/taskApiSlice";
import { useGetUserfavouriteQuery } from "../redux/Features/userApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Features/selector";
import AddTaskModal from "../components/AddTaskModal";
import { useState } from "react";

function Collections() {
  const userInfo = useSelector(selectUser);
  const { data: collectionsData, error } = useGetAllCollectionsQuery();

  const { data: favouriteData } = useGetUserfavouriteQuery(userInfo?._id);
  const { data: tasksData } = useGetUserTaskQuery();

  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);

  // Error handling
  if (error) {
    const errorMessage =
      "status" in error ? error.status : error.message || "Unknown error";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="max-w-screen-md h-[90vh] mx-auto p-7">
      <Link
        to="/collections"
        className="text-3xl font-bold mb-7 dark:text-white"
      >
        Collections
      </Link>
      <div className="my-7 ">
        <div className="flex">
          <NavLink
            to="/collections"
            className={({ isActive }) =>
              isActive
                ? "block py-1 px-3 rounded-l-md border border-red-500 text-red-500"
                : "block py-1 px-3 rounded-l-md border dark:text-white border-gray-400 transition-colors"
            }
          >
            All Collections
          </NavLink>
          <NavLink
            to="/favorite"
            className={({ isActive }) =>
              isActive
                ? "block py-1 px-3 rounded-r-md border-red-500 text-red-500"
                : "block py-1 px-3 rounded-r-md border dark:text-white border-gray-400 transition-colors"
            }
          >
            Favourites
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {collectionsData?.collections.map((collection) => {
          // Check if tasksData is defined before filtering
          const tasksForCollection = tasksData?.tasks?.filter(
            (task) => task.collectionId?._id === collection._id // Use optional chaining here
          );

          const totalTasks = tasksForCollection?.length || 0;
          const completedTasks =
            tasksForCollection?.filter((task) => task.status === true).length ||
            0;

          return (
            <Link
              to={`/collections/${collection._id}`}
              className="flex flex-col rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-700 p-3"
              key={collection._id}
            >
              <img
                src={collection.collectionImg}
                alt={collection.collectionName}
                className="w-full h-16 object-contain rounded-md mb-4"
              />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-start">
                    {collection.collectionName}
                  </h3>
                  <p className="dark:text-gray-200">
                    {completedTasks}/{totalTasks} done
                  </p>
                </div>

                <i
                  className={`far fa-circle text-2xl ${
                    favouriteData?.favourite?.some(
                      (item) => item._id === collection._id
                    )
                      ? "text-green-500 text-bold"
                      : "text-gray-400"
                  }`}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </Link>
          );
        })}

        {/* Button to add a new task */}
        <div className="mb-14 border border-gray-400 border-dashed rounded-lg flex items-center justify-center">
          <button
            onClick={() => setOpenTaskModal(true)}
            className="fas fa-plus text-gray-500 text-2xl rounded-md"
          ></button>
        </div>
      </div>

      {/* Modal for adding a task */}
      <AddTaskModal
        showModal={openTaskModal}
        onClose={() => setOpenTaskModal(false)}
      />
    </div>
  );
}

export default Collections;
