import "../App.css";
import {
    Container,
    Box,
    Stack,
    Divider,
    Typography,
    IconButton,
} from "@mui/material";
import lgrclogo from "../assets/images/lgrclogo.png";
import pilipinaslogo from "../assets/images/pilipinaslogo.png";
import manilalogo from "../assets/images/manilalogo.png";
import dilglogo from "../assets/images/dilglogo.png";
import { CusLogInput, CusPrimBtn, CusThirdBtn, CusToast } from "../components";
import {
    PersonRounded,
    LockRounded,
    VisibilityOffRounded,
    VisibilityRounded,
} from "@mui/icons-material";
import { useData } from "../DataContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axiosClient";
import { ForgotPassForm } from "../forms";

import { useFormik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
    const { token, setToken, setRole, setCurUser, users, setUsers } = useData();
    const [showPassword, setShowPassword] = useState(false);
    const [logError, setLogError] = useState("");
    const [openForgot, setOpenForgot] = useState(false);
    const [variant, setVariant] = useState("");
    const [message, setMessage] = useState("");
    const [openToast, setOpenToast] = useState(false);
    const handleShowPass = () => setShowPassword((show) => !show);

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    const form = useFormik({
        initialValues: {
            uname: "",
            password: "",
        },
        validationSchema: Yup.object({
            uname: Yup.string().required("Username is required."),
            password: Yup.string().required("Password is required."),
        }),
        onSubmit: (value, actions) => {
            setLogError("");
            axiosClient
                .post("/login", value)
                .then((data) => {
                    if (data.data.status) {
                        setToken(data.data.token);
                        let userRole = data.data.user;
                        setCurUser(userRole);
                        setRole(userRole.role);
                    } else {
                        setLogError(data.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            actions.resetForm();
        },
    });

    const forgotForm = useFormik({
        initialValues: {
            email: "",
            password: "",
            conpass: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email is required."),
            password: Yup.string().required("New Password is required."),
            conpass: Yup.string().required("Confirm new password is required."),
        }),
        onSubmit: (value, actions) => {
            // const match = users.filter((user) =>
            //     user.email === value.email ? user.id : null
            // );

            if (value.password == value.conpass) {
                // if (match) {
                    axiosClient
                        .post(`/forgot`, {
                            email: value.email,
                            password: value.password,
                        })
                        .then((data) => {
                            if (data.status == 200 || data.status == 201) {
                                setUsers(
                                    users.map((user) =>
                                        user.id === data.data.id
                                            ? data.data
                                            : user
                                    )
                                );
                                setVariant("success");
                                setMessage("Password successfully changed.");
                                setOpenToast(true);
                                setOpenForgot(false)
                            } else {
                                console.log(data.data.message);
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            setVariant("error");
                            setMessage(error.response.data.message);
                            setOpenToast(true);
                            setOpenForgot(false);
                        });
                // } else {
                //     setVariant("error");
                //     setMessage("Email is not registered.");
                //     setOpenToast(true);
                // }
            } else {
                setVariant("error");
                setMessage("Password does not match.");
                setOpenToast(true);
            }
            actions.resetForm();
        },
    });

    if (token != null) {
        return <Navigate to={"/"} />;
    }
    return (
        <Container
            className="login-bg"
            fixed
            sx={{
                height: "100vh",
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems={{
                    xs: "center",
                    sm: "center",
                    md: "flex-start",
                    lg: "flex-start",
                    xl: "flex-start",
                }}
                justifyContent={"center"}
                justifyItems={"center"}
                height={"100%"}
            >
                <Box
                    width={{ xs: 300, sm: 350, md: 370, lg: 400 }}
                    display="flex"
                    py={3}
                    px={5}
                    alignItems="center"
                    flexDirection="column"
                    className="login-form"
                    justifyItems={"center"}
                    justifyContent={"center"}
                    justifySelf={"center"}
                >
                    <Stack gap={2}>
                        <Stack
                            flexDirection="row"
                            width="100%"
                            alignItems="center"
                            justifyContent="center"
                            alignContent={"center"}
                            gap={{ xs: 2, sm: 3 }}
                        >
                            <img
                                src={manilalogo}
                                alt="Manila Logo"
                                height={70}
                            />
                            <img
                                src={pilipinaslogo}
                                alt="Bagong Pilipinas Logo"
                                height={80}
                            />
                        </Stack>
                        <Divider width="101%" />
                        <Typography
                            className="title-text"
                            fontSize="1.2rem"
                            fontWeight="bold"
                            textAlign={"center"}
                        >
                            <span>INFORMAL SETTLER </span>
                            <span style={{ display: "inline-block" }}>
                                FAMILIES DATABASE AND ESTATE
                            </span>
                            <span style={{ display: "inline-block" }}>
                                MANAGEMENT SYSTEM
                            </span>
                        </Typography>

                        <Divider width="101%" />
                        <form onSubmit={form.handleSubmit}>
                            <Stack gap={2}>
                                <CusLogInput
                                    name="uname"
                                    label="Username"
                                    required={true}
                                    placeholder={"juandc"}
                                    adornment={
                                        <PersonRounded
                                            sx={{
                                                color: "#4C6085",
                                                fontSize: 16,
                                            }}
                                        />
                                    }
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                    value={form.values.uname}
                                    error={form.errors.uname}
                                    touch={form.touched.uname}
                                />
                                <CusLogInput
                                    name="password"
                                    label="Password"
                                    required={true}
                                    placeholder={"•••••••"}
                                    adornment={
                                        <LockRounded
                                            sx={{
                                                color: "#4C6085",
                                                fontSize: 16,
                                            }}
                                        />
                                    }
                                    endAdornment={
                                        <IconButton
                                            onClick={handleShowPass}
                                            onMouseDown={handleMouseDown}
                                        >
                                            {showPassword ? (
                                                <VisibilityOffRounded
                                                    sx={{
                                                        color: "#4C6085",
                                                        fontSize: 16,
                                                    }}
                                                />
                                            ) : (
                                                <VisibilityRounded
                                                    sx={{
                                                        color: "#4C6085",
                                                        fontSize: 16,
                                                    }}
                                                />
                                            )}
                                        </IconButton>
                                    }
                                    value={form.values.password}
                                    onChange={form.handleChange}
                                    type={showPassword ? "text" : "password"}
                                    error={form.errors.password}
                                    touch={form.touched.password}
                                    onBlur={form.handleBlur}
                                />

                                <CusPrimBtn label="Login" type="submit" />
                                <Typography
                                    fontSize={11}
                                    fontWeight="thin"
                                    textAlign={"center"}
                                    color={"#BB0406"}
                                    lineHeight={1}
                                >
                                    {form.touched.uname || form.touched.password
                                        ? ""
                                        : logError}
                                </Typography>
                                <Stack
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={{ xs: 1 }}
                                    mt={-2}
                                >
                                    <Stack
                                        width={"70%"}
                                        alignItems={"flex-end"}
                                    >
                                        <CusThirdBtn
                                            label="Forgot Password?"
                                            type="button"
                                            action={() => setOpenForgot(true)}
                                        />

                                        <ForgotPassForm
                                            label={"Change Password?"}
                                            form={forgotForm}
                                            open={openForgot}
                                            setOpen={setOpenForgot}
                                            action={() => {
                                                setOpenForgot(false);
                                                forgotForm.resetForm();
                                            }}
                                        />
                                        <CusToast
                                            variant={variant}
                                            message={message}
                                            openToast={openToast}
                                            setOpenToast={setOpenToast}
                                        />
                                    </Stack>
                                    <Stack
                                        width={"25%"}
                                        flexDirection="row"
                                        gap={1}
                                        alignItems={"center"}
                                        justifyContent={"flex-end"}
                                    >
                                        <img
                                            src={dilglogo}
                                            alt="DILG Logo"
                                            height={35}
                                        />
                                        <img
                                            src={lgrclogo}
                                            alt="LGRC Logo"
                                            height={40}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
