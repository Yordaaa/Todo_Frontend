import AppRoutes from "./AppRoutes";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800">
        <Header />
        <AppRoutes />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
