import { Navigate, Outlet } from "react-router-dom";
import { useData } from "../DataContext";

const PublicRoutes = () => {
    const { token, curUser } = useData();

    return token && curUser ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
