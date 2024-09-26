import { useSelector } from "react-redux";
import {
  useGetUserfavouriteQuery,
  useRemoveFromfavouriteMutation,
} from "../redux/Features/userApiSlice";
import { selectUser } from "../redux/Features/selector";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserTaskQuery } from "../redux/Features/taskApiSlice";

const Favorite = () => {
  const userInfo = useSelector(selectUser);
  const [removeFromfavourite] = useRemoveFromfavouriteMutation();
  const { data, isLoading } = useGetUserfavouriteQuery(userInfo?._id);
  const { data: tasksData } = useGetUserTaskQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRemoveFromfavourite = async (
    collectionId: string | undefined
  ) => {
    try {
      await removeFromfavourite({ collectionId }).unwrap();
      toast.success("Removed from favourites");
    } catch (error) {
      toast.error("Unexpected error occurred while removing from favourites");
    }
  };

  return (
    <div className="max-w-screen-md h-[90vh] mx-auto p-7">
      <h1 className="text-3xl font-bold pb-7 dark:text-white">Collections</h1>
      <div className="mb-7">
        <div className="flex">
          <NavLink
            to="/collections"
            className={({ isActive }) =>
              isActive
                ? "block py-1 px-3 rounded-l-md border border-red-500 text-red-500"
                : "block py-1 px-3 rounded-l-md border dark:text-white border-gray-400  transition-colors"
            }
          >
            All Collections
          </NavLink>
          <NavLink
            to="/favorite"
            className={({ isActive }) =>
              isActive
                ? "block py-1 px-3 rounded-r-md border border-red-500 text-red-500"
                : "block py-1 px-3 rounded-r-md border border-gray-400 dark:text-white  transition-colors"
            }
          >
            Favourites
          </NavLink>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto p-5 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.favourite.map((collection) => {
            console.log(tasksData?.tasks);
            const tasksForCollection = tasksData?.tasks.filter(
              (task) => task.collectionId._id === collection._id
            );

            const totalTasks = tasksForCollection?.length || 0;
            const completedTasks =
              tasksForCollection?.filter((task) => task.status === true)
                .length || 0;

            return (
              <div
                key={collection._id}
                className="flex flex-col rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-700 p-3"
              >
                <Link to={`/collections/${collection._id}`}>
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
                        data.favourite.some(
                          (item) => item._id === collection._id
                        )
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleRemoveFromfavourite(collection._id)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                </Link>
              </div>
            );
          })}

          <div className="mb-14 border border-gray-400 border-dashed rounded-lg flex items-center justify-center">
            <Link to="/addtask">
              <i className="fas fa-plus text-gray-500 text-2xl rounded-md"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
