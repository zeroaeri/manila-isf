import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { ForgotPassForm } from "../forms";
import CusToast from "./CusToast";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useData } from "../DataContext";
const CusMenu = () => {
    const { setToken, setRole, setCurUser, users, setUsers, curUser } =
        useData();

    const [openForgot, setOpenForgot] = useState(false);
    const [variant, setVariant] = useState("");
    const [message, setMessage] = useState("");
    const [openToast, setOpenToast] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleForgot = () => {
        setOpenForgot(true);
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        setAnchorEl(null);

        axiosClient.get("/logout").then(() => {
            setToken(null);
            setRole(null);
            setCurUser(null);
            navigate("/login");
        });
    };

    const forgotForm = useFormik({
        initialValues: {
            email: curUser.email,
            password: "",
            conpass: "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            password: Yup.string().required("New Password is required."),
            conpass: Yup.string().required("Confirm new password is required."),
        }),
        onSubmit: (value, actions) => {
            if (value.password == value.conpass) {
                axiosClient
                    .post(`/user/${curUser.id}`, {
                        password: value.password,
                        _method: "PUT",
                    })
                    .then((data) => {
                        
                        if (data.status == 200 || data.status == 201) {
                            setCurUser({
                                ...curUser,
                                password: value.password,
                            });
                            setVariant("success");
                            setMessage("User successfully edited.");
                            setOpenToast(true);
                        } else {
                            console.log(data.data.message);
                        }
                    })
                    .catch((error) => {
                        setVariant("error");
                        setMessage(error.response.data.message);
                        setOpenToast(true);
                    });
                    setOpenForgot(false);
            } else {
                setVariant("error");
                setMessage("Password does not match.");
                setOpenToast(true);
            }
            actions.resetForm();
        },
    });

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <Avatar sx={{ width: 26, height: 26, fontSize: 12 }}>
                    <Person sx={{ fontSize: 18 }} />
                </Avatar>
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "user-menu",
                }}
                sx={{ fontSize: 12 }}
            >
                <MenuItem onClick={handleForgot} sx={{ fontSize: 12 }}>
                    Change Password
                </MenuItem>
                <MenuItem onClick={handleLogOut} sx={{ fontSize: 12 }}>
                    Logout
                </MenuItem>
            </Menu>

            <ForgotPassForm
                label={"Change Password?"}
                form={forgotForm}
                open={openForgot}
                setOpen={setOpenForgot}
                action={() => {
                    setOpenForgot(false);
                    forgotForm.resetForm();
                }}
                method={'EDIT'}
            />
            <CusToast
                variant={variant}
                message={message}
                openToast={openToast}
                setOpenToast={setOpenToast}
            />
        </>
    );
};

export default CusMenu;
