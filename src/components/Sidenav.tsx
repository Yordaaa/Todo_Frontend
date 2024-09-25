import { Link, NavLink } from "react-router-dom";
import { useGetAllCollectionsQuery } from "../redux/Features/taskApiSlice";

function Sidenav() {
  const { data, error, isLoading } = useGetAllCollectionsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage =
      "status" in error ? error.status : error.message || "Unknown error";
    return <div>Error: {errorMessage}</div>;
  }

  const collections = data?.collections || [];

  return (
    <aside className="w-64 h-full bg-white dark:bg-gray-800 dark:text-gray-200 py-5 px-10">
      <Link to="/collections" className="text-2xl font-bold mb-5">
        Collections
      </Link>
      <ul className="space-y-3 pt-5">
        {collections.map((collection) => (
          <li key={collection._id}>
            <NavLink
              to={`/collections/${collection._id}`}
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 rounded bg-pink-50 text-red-500"
                  : "block py-2 px-3 rounded hover:bg-gray-200 transition-colors"
              }
            >
              <div className="flex gap-3 items-center">
                <img src={collection.collectionImg} alt="" className="h-8" />
                <p>{collection.collectionName}</p>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidenav;
