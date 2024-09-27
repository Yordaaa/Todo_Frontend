import { ErrorResponse, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/Features/authSlice";
import { useLoginMutation } from "../../redux/Features/authApiSlice";
import { ResTypeProps } from "../../redux/Features/types";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ name, password });
      if ("data" in res) {
        const { data } = res as { data: ResTypeProps };
        toast.success("Signed in successfully");
        dispatch(setCredentials(data.userInfo));
        navigate("/collections");
      } else {
        const { error } = res as { error: ErrorResponse };
        toast.error(error.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <section className="pt-24">
      <div className="flex justify-center ">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png"
          className="h-20"
        />
      </div>
      <p className="font-extrabold text-xl pt-2 text-gray-800 text-center dark:text-white">
        TODO
      </p>

      <div className="h-screen justify-center items-center mt-5">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 md:space-y-2 w-full max-w-sm mx-auto"
        >
          <div className="relative  items-center ">
            <div className="flex">
              <i className="far fa-user bg-white text-gray-800  border rounded-l-md border-gray-300 border-r-0 p-2"></i>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                id="name"
                placeholder="Name"
                className="text-gray-900 block w-full border rounded-r-md border-gray-300 border-l-0 p-1  px-2"
              />
            </div>
          </div>
          <div className="">
            <div className="flex  items-center relative  ">
              <i className="fas fa-lock bg-white text-gray-800  border rounded-l-md border-gray-300 border-r-0 p-2"></i>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                placeholder="password"
                className="text-gray-900 block w-full border rounded-r-md border-gray-300 border-l-0 p-1  px-2"
              />
            </div>
          </div>

          <div className="flex items-center justify-between"></div>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:opacity-90 transition-all duration-200 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
          >
            {isLoading ? "Loging in..." : "Login"}
          </button>
          <p className="text-sm font-light text-blue-500">
            Or
            <Link to="/register" className="font-medium hover:underline">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
