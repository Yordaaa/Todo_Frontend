import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCollectionByIdQuery } from "../redux/Features/taskApiSlice";
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
import { Collection } from "../redux/Features/types"; // Import your types

function CollectionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser);
  
  const { data: collectionData, isLoading } = useGetCollectionByIdQuery(id as string);
  
  const [addfavourite] = useAddfavouriteMutation();
  const [removeFromfavourite] = useRemoveFromfavouriteMutation();

  const { data } = useGetUserfavouriteQuery(userInfo?._id);

  const collection = collectionData?.collection as Collection;

  const handleAddfavourite = async (collectionId?: string) => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    try {
      await addfavourite({ collectionId }).unwrap();
      toast.success("Added to favourites");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Unexpected error occurred while adding to favourites");
    }
  };

  const handleRemoveFromfavourite = async (collectionId?: string) => {
    if (!userInfo) {
      navigate("/login", { state: `/${collectionId}` });
      return;
    }

    try {
      await removeFromfavourite({ collectionId }).unwrap();
      toast.success("Removed from favourites");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Unexpected error occurred while removing from favourites");
    }
  };

  const isInfavourite = data?.favourite?.some(item => item._id === collection?._id);

  return (
    <>
      {isLoading ? (
        "loading..."
      ) : (
        <section className="flex max-w-screen-2xl mx-auto h-screen">
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
                {collection?.collectionName}
              </h1>
              {isInfavourite ? (
                <button
                  onClick={() => handleRemoveFromfavourite(collection?._id)}
                  className={`fas fa-heart text-2xl ${isInfavourite ? "text-red-600" : ""}`}
                ></button>
              ) : (
                <button
                  onClick={() => handleAddfavourite(collection?._id)}
                  className="far fa-heart text-2xl hover:text-red-600 text-gray-800 dark:text-gray-200 mr-2"
                ></button>
              )}
            </div>

            <div className="flex gap-3 items-center ml-7">
              <i className="fas fa-plus bg-pink-400 px-2 py-1 rounded text-white"></i>
              <p className="text-sm font-bold dark:text-white">Add Task</p>
            </div>

            <h2 className="ml-6 pt-2 dark:text-white">
              Tasks: {collection?.tasks?.length || 0}
            </h2>

            <div className="ml-10">
              {collection?.tasks && collection.tasks.length === 0 ? (
                <div className="flex justify-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5058/5058432.png"
                    alt="No tasks"
                    className="h-40 m-10"
                  />
                </div>
              ) : (
                 <TaskList tasks={collection?.tasks} task={null} />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CollectionDetails;