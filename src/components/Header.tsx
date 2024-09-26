import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/Features/selector";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/Features/authApiSlice";
import { logout } from "../redux/Features/authSlice";
import AddTaskModal from "./AddTaskModal";

function Header() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await logoutApi();
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const userInfo = useSelector(selectUser);

  return (
    <>
      <div className="flex justify-between py-3 max-w-screen-2xl mx-auto px-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png"
            className="h-7"
          />
          <label className="font-extrabold text-gray-800 dark:text-white">
            TODO
          </label>
        </div>
        <div className="flex gap-2">
          {userInfo ? (
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setOpenTaskModal(true)}
                className="fas fa-plus bg-pink-500 text-white text-xs rounded shadow-sm p-1 px-2"
              ></button>
              <div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="">
                      <i className="far fa-user text-white bg-gray-400 rounded-full py-1 text-sm px-2"></i>
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="p-3 absolute right-0 z-10 mt-2 w-[244px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="text-[14px] pb-2">
                      Are you sure you want to logout?
                    </div>
                    <div className="flex justify-end">
                      <MenuItem>
                        <button
                          type="submit"
                          className="block w-fit border rounded-md px-2 py-1 text-left text-xs text-gray-700 "
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                          No
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          type="submit"
                          className="block w-fit px-2 bg-pink-500 rounded-md text-white ml-2 py-1 text-left text-xs"
                          onClick={handleLogout}
                        >
                          Yes
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          ) : (
            ""
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <i className="fas fa-sun text-yellow-500 bg-gray-700 text-sm rounded-full px-2 py-1"></i>
            ) : (
              <i className="fas fa-moon text-gray-800 bg-gray-200 text-sm rounded-full px-2 py-1"></i>
            )}
          </button>
        </div>
      </div>

      {/* Render the Add Task Modal */}
      <AddTaskModal
        showModal={openTaskModal}
        onClose={() => setOpenTaskModal(false)}
      />
    </>
  );
}

export default Header;
