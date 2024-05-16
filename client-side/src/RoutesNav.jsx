import {
    LoginPage,
    UserRegPage,
    DistrictRegPage,
    EstateRegPage,
    ISFRegPage,
    AwardeeRegPage,
    ActivityLogsPage,
    HomePage,
} from "./pages";
import { AdminPages, NotFoundPage } from "./default";
import { PrivateRoutes, PublicRoutes } from "./navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const RoutesNav = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" index element={<LoginPage />} />
                <Route path="/" element={<PrivateRoutes />}>
                    <Route path="/" element={<AdminPages />}>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/"
                            element={<PrivateRoutes roleReq="Super Admin" />}
                        >
                            <Route path="/user" element={<UserRegPage />} />
                            <Route
                                path="/district"
                                element={<DistrictRegPage />}
                            />
                            <Route path="/estate" element={<EstateRegPage />} />
                            <Route
                                path="/logs"
                                element={<ActivityLogsPage />}
                            />
                        </Route>
                        <Route
                            path="/"
                            element={<PrivateRoutes roleReq="Admin" />}
                        ></Route>
                        <Route
                            path="/"
                            element={<PrivateRoutes roleReq="ISF Admin" />}
                        >
                            <Route path="/isf/:name" element={<ISFRegPage />} />
                        </Route>

                        <Route
                            path="/"
                            element={<PrivateRoutes roleReq="Estate Admin" />}
                        >
                            <Route
                                path="/estate/:name"
                                element={<AwardeeRegPage />}
                            />
                        </Route>
                    </Route>
                </Route>
                {/* <Route path="login" element={<PublicRoutes />}></Route> */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default RoutesNav;
