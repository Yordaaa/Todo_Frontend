import { Link, NavLink } from "react-router-dom";
import { useGetAllCollectionsQuery } from "../redux/Features/taskApiSlice";
import { useGetUserfavouriteQuery } from "../redux/Features/userApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Features/selector";

function Collections() {
  const userInfo = useSelector(selectUser);
  const {
    data: collectionsData,
    error,
    isLoading,
  } = useGetAllCollectionsQuery();

  const { data } = useGetUserfavouriteQuery(userInfo?._id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage =
      "status" in error ? error.status : error.message || "Unknown error";
    return <div>Error: {errorMessage}</div>;
  }

  const collections = collectionsData?.collections || [];

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
                : "block py-1 px-3 rounded-l-md border dark:text-white border-gray-400  transition-colors"
            }
          >
            All Collections
          </NavLink>
          <NavLink
            to="/favorite"
            className={({ isActive }) =>
              isActive
                ? "block py-1 px-3 rounded-r-md  border-red-500 text-red-500"
                : "block py-1 px-3 rounded-r-md border dark:text-white border-gray-400  transition-colors"
            }
          >
            Favourites
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {collections.map((collection) => {
          

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
                  1/2 done
                  </p>
                </div>

                <i
                  className={`far fa-circle text-2xl ${
                    data?.favourite?.some((item) => item._id === collection._id)
                      ? "text-green-500 text-bold"
                      : "text-gray-400"
                  }`}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </Link>
          );
        })}

        <div className="mb-14 border border-gray-400 border-dashed rounded-lg flex items-center justify-center">
          <Link to="/addtask">
            <i className="fas fa-plus text-gray-500 text-2xl rounded-md"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Collections;
