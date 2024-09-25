import { Route, Routes } from "react-router-dom";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import Collections from "./pages/Collections";
import CollectionDetails from "./pages/CollectionDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Favorite from "./pages/Favorite";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:id" element={<CollectionDetails />} />
        <Route path="/favorite" element={<Favorite />} /> 
      </Route>
    </Routes>
  );
}

export default AppRoutes;
