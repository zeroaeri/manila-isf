import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useData } from "../DataContext";
import { SideNav } from "../layout";

const AdminPages = () => {
    const { curUser, token, setToken, setCurUser, setRole, curUserRole } =
        useData();
    if (!token) {
        return <Navigate to={"/login"} />;
    }

    return (
        <>
            {curUser && (
                <SideNav
                    curUser={curUser}
                    setCurUser={setCurUser}
                    setToken={setToken}
                    setRole={setRole}
                    curUserRole={curUserRole}
                    children={<Outlet />}
                />
            )}
        </>
    );
};

export default AdminPages;
