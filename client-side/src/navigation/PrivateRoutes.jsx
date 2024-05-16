import { Navigate, Outlet } from "react-router-dom";
import { useData } from "../DataContext";

const PrivateRoutes = ({ roleReq }) => {
    const { token, curUserRole } = useData();
    let users = {
        "ISF Admin": 1,
        "Estate Admin": 1,
        Admin: 2,
        "Super Admin": 3,
    };

    if (roleReq) {
        return token && curUserRole ? (
            users[curUserRole] == 1 && roleReq == curUserRole ? (
                <Outlet />
            ) : users[curUserRole] != 1 &&
              users[curUserRole] >= users[roleReq] ? (
                <Outlet />
            ) : (
                <Navigate to={"*"} />
            )
        ) : (
            <Navigate to={"/login"} />
        );
    } else {
        return token ? <Outlet /> : <Navigate to="/login" />;
    }
};

export default PrivateRoutes;
