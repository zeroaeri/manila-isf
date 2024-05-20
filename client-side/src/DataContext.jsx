import React, { createContext, useState, useContext, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import axiosClient from './axiosClient';
const DataContext = createContext({
    curUser: null,
    token: null,
    setCurUser: () => {},
    setToken: () => {},
});

export const DataProvider = ({ children }) => {
    const [curUser, setCurUser] = useState({});
    const [curUserRole, _setCurUserRole] = useState(
        localStorage.getItem("ACCESS_ROLE")
    );
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [estates, setEstates] = useState([]);
    const [isfs, setISFs] = useState([]);
    const [awardees, setAwardees] = useState([]);
    const [logs, setLogs] = useState([]);

    const brgys = [
        { zone: 1, min: 1, max: 9 },
        { zone: 2, min: 11, max: 32 },
        { zone: 3, min: 33, max: 47 },
        { zone: 4, min: 48, max: 55 },
        { zone: 5, min: 56, max: 61 },
        { zone: 6, min: 62, max: 75 },
        { zone: 7, min: 76, max: 90 },
        { zone: 8, min: 91, max: 106 },
        { zone: 9, min: 107, max: 123 },
        { zone: 10, min: 124, max: 128 },
        { zone: 11, min: 129, max: 134 },
        { zone: 12, min: 135, max: 146 },
        { zone: 13, min: 147, max: 151 },
        { zone: 14, min: 152, max: 165 },
        { zone: 15, min: 166, max: 176 },
        { zone: 16, min: 177, max: 186 },
        { zone: 17, min: 187, max: 197 },
        { zone: 18, min: 198, max: 205 },
        { zone: 19, min: 206, max: 212 },
        { zone: 20, min: 213, max: 220 },
        { zone: 21, min: 221, max: 233 },
        { zone: 22, min: 234, max: 248 },
        { zone: 23, min: 249, max: 259 },
        { zone: 24, min: 260, max: 267 },
        { zone: 25, min: 268, max: 276 },
        { zone: 26, min: 281, max: 286 },
        { zone: 27, min: 287, max: 291 },
        { zone: 28, min: 292, max: 296 },
        { zone: 29, min: 297, max: 305 },
        { zone: 30, min: 306, max: 309 },
        { zone: 31, min: 310, max: 314 },
        { zone: 32, min: 315, max: 325 },
        { zone: 33, min: 326, max: 335 },
        { zone: 34, min: 336, max: 343 },
        { zone: 35, min: 344, max: 352 },
        { zone: 36, min: 353, max: 362 },
        { zone: 37, min: 363, max: 372 },
        { zone: 38, min: 373, max: 382 },
        { zone: 39, min: 383, max: 388 },
        { zone: 40, min: 389, max: 394 },
        { zone: 41, min: 395, max: 404 },
        { zone: 42, min: 405, max: 416 },
        { zone: 43, min: 417, max: 428 },
        { zone: 44, min: 429, max: 449 },
        { zone: 45, min: 450, max: 461 },
        { zone: 46, min: 462, max: 471 },
        { zone: 47, min: 472, max: 481 },
        { zone: 48, min: 482, max: 491 },
        { zone: 49, min: 492, max: 501 },
        { zone: 50, min: 502, max: 511 },
        { zone: 51, min: 512, max: 520 },
        { zone: 52, min: 521, max: 531 },
        { zone: 53, min: 532, max: 541 },
        { zone: 54, min: 542, max: 554 },
        { zone: 55, min: 555, max: 568 },
        { zone: 56, min: 569, max: 580 },
        { zone: 57, min: 581, max: 586 },
        { zone: 68, min: 649, max: 653 },
        { zone: 69, min: 654, max: 656 },
        { zone: 70, min: 657, max: 658 },
        { zone: 71, min: 659, max: 664 }, // 664A
        { zone: 72, min: 666, max: 670 },
        { zone: 73, min: 671, max: 676 },
        { zone: 74, min: 677, max: 685 },
        { zone: 75, min: 686, max: 695 },
        { zone: 76, min: 696, max: 699 },
        { zone: 77, min: 700, max: 706 },
        { zone: 78, min: 707, max: 721 },
        { zone: 79, min: 722, max: 730 },
        { zone: 80, min: 731, max: 744 },
        { zone: 81, min: 745, max: 754 },
        { zone: 82, min: 755, max: 762 },
        { zone: 83, min: 763, max: 769 },
        { zone: 84, min: 770, max: 775 },
        { zone: 85, min: 776, max: 783 },
        { zone: 86, min: 784, max: 793 },
        { zone: 87, min: 794, max: 807 },
        { zone: 88, min: 808, max: 820 },
        { zone: 89, min: 821, max: 828 },
        { zone: 58, min: 587, max: 593 },
        { zone: 59, min: 594, max: 601 },
        { zone: 60, min: 602, max: 606 },
        { zone: 61, min: 607, max: 618 },
        { zone: 62, min: 619, max: 625 },
        { zone: 63, min: 626, max: 630 },
        { zone: 64, min: 631, max: 636 },
        { zone: 65, min: 637, max: 640 },
        { zone: 66, min: 641, max: 644 },
        { zone: 67, min: 645, max: 648 },
        { zone: 90, min: 829, max: 832 },
        { zone: 91, min: 833, max: 840 },
        { zone: 92, min: 841, max: 848 },
        { zone: 93, min: 849, max: 859 },
        { zone: 94, min: 860, max: 865 },
        { zone: 95, min: 866, max: 872 },
        { zone: 96, min: 873, max: 880 },
        { zone: 97, min: 881, max: 885 },
        { zone: 98, min: 886, max: 891 },
        { zone: 99, min: 892, max: 897 },
        { zone: 100, min: 898, max: 905 },
    ];

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setRole = (role) => {
        _setCurUserRole(role);
        if (role) {
            localStorage.setItem("ACCESS_ROLE", role);
        } else {
            localStorage.removeItem("ACCESS_ROLE");
        }
    };

    useEffect(() => {
        if (token) {
            axiosClient.get("/profile").then(({ data }) => {
                setCurUser(data.data);
            });

            axiosClient.get("/user").then((response) => {
                setUsers(response.data);
            });

            axiosClient.get("/district").then((response) => {
                setDistricts(response.data);
            });

            axiosClient.get("/estate").then((response) => {
                setEstates(response.data);
            });

            axiosClient.get("/isf").then((response) => {
                setISFs(response.data);
            });

            axiosClient.get("/awardee").then((response) => {
                setAwardees(response.data);
            });

            axiosClient.get("/activity").then((response) => {
                setLogs(response.data);
            });

            setLoading(false);
        }
    }, [token]);

    return token && loading ? (
        <Box
            sx={{
                display: "flex",
            }}
            height={"100vh"}
            w={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <CircularProgress size={50} />
        </Box>
    ) : (
        <DataContext.Provider
            value={{
                curUser,
                token,
                setCurUser,
                setToken,
                setLoading,
                users,
                districts,
                setUsers,
                setDistricts,
                estates,
                setEstates,
                brgys,
                setISFs,
                isfs,
                setAwardees,
                awardees,
                logs,
                curUserRole,
                setRole,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
