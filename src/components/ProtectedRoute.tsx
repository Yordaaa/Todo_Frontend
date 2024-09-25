import { useSelector } from 'react-redux';
import { selectUser } from '../redux/Features/selector';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const userInfo = useSelector(selectUser);

    if (userInfo) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
}
export default ProtectedRoute;
