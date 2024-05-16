import { useState } from "react";
import { Body } from "../layout";
import { UserForms } from "../forms";
import axiosClient from "../axiosClient";
import { useData } from "../DataContext";

import { useFormik } from "formik";
import * as Yup from "yup";

const UserRegPage = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [curSearch, setCurSearch] = useState("");
    const [curFilter, setCurFilter] = useState("All");
    const [variant, setVariant] = useState("");
    const [message, setMessage] = useState("");
    const [curRow, setCurRow] = useState({
        fname: "",
        mname: "N/A",
        lname: "",
        uname: "",
        role: "",
        email: "",
        department: "",
        password: "",
        updated_at: "",
    });

    const { users, setUsers, curUser } = useData();

    const filterBy = [
        "Super Admin",
        "Admin",
        "ISF Admin",
        "Estate Admin",
        "All",
    ];

    // add users
    const form = useFormik({
        initialValues: {
            fname: "",
            mname: "",
            lname: "",
            uname: "",
            role: "",
            email: "",
            department: "",
            password: "",
            conpass: "",
        },
        validationSchema: Yup.object({
            fname: Yup.string().required("First name is required."),
            lname: Yup.string().required("Last name is required."),
            uname: Yup.string().required("Username is required."),
            role: Yup.string().required("Role is required."),
            email: Yup.string().required("Email is required."),
            department: Yup.string().required("Department is required."),
            password: Yup.string().required("Password is required."),
            conpass: Yup.string().required("Confirm password is required."),
        }),
        onSubmit: (value, actions) => {
            if (value.password == value.conpass) {
                axiosClient
                    .post("/user", value)
                    .then((data) => {
                        if (data.status == 200 || data.status == 201) {
                            setUsers([...users, data.data]);

                            axiosClient
                                .post("/activity", {
                                    name: `${curUser.fname} ${curUser.lname}`,
                                    activity: `Added ${value.fname} ${value.lname} at User Registration.`,
                                    type: "Added",
                                })
                                .then((data) => {
                                    if (
                                        data.status == 200 ||
                                        data.status == 201
                                    ) {
                                        setVariant("success");
                                        setMessage("User successfully added.");
                                        setOpenToast(true);
                                    } else {
                                        console.log(data.data.message);
                                    }
                                });
                        } else {
                            console.log(data.data.message);
                        }
                    })
                    .catch((error) => {
                        setVariant("error");
                        setMessage(error.response.data.message);
                        setOpenToast(true);
                    });

                setOpenAdd(false);
                actions.resetForm();
            } else {
                setVariant("error");
                setMessage("Password does not match.");
                setOpenToast(true);
            }
        },
    });

    // edit user
    const editForm = useFormik({
        initialValues: curRow,
        enableReinitialize: true,
        onSubmit: (value, actions) => {
            axiosClient
                .post(`/user/${value.id}`, { ...value, _method: "PUT" })
                .then((data) => {
                    if (data.status == 200 || data.status == 201) {
                        setUsers(
                            users.map((user) =>
                                user.id === data.data.id ? data.data : user
                            )
                        );

                        axiosClient
                            .post("/activity", {
                                name: `${curUser.fname} ${curUser.lname}`,
                                activity: `Edited ${value.fname} ${value.lname} at User Registration.`,
                                type: "Edited",
                            })
                            .then((data) => {
                                if (data.status == 200 || data.status == 201) {
                                    setVariant("success");
                                    setMessage("User successfully edited.");
                                    setOpenToast(true);
                                } else {
                                    console.log(data.data.message);
                                }
                            });
                    } else {
                        console.log(data.data.message);
                    }
                })
                .catch((error) => {
                    setVariant("error");
                    setMessage(error.response.data.message);
                    setOpenToast(true);
                });
            setOpenEdit(false);
        },
    });

    // fetch users
    const columns = [
        { id: "id", label: "ID", minWidth: 100 },
        { id: "name", label: "Name", minWidth: 170 },
        {
            id: "role",
            label: "Role",
            minWidth: 150,
        },
        {
            id: "department",
            label: "Department",
            minWidth: 150,
        },
        {
            id: "uname",
            label: "Username",
            minWidth: 150,
        },
    ];

    function createData(
        id,
        name,
        role,
        department,
        uname,
        fname,
        mname,
        lname,
        email,
        updated_at
    ) {
        return {
            id,
            name,
            role,
            department,
            uname,
            fname,
            mname,
            lname,
            email,
            updated_at,
        };
    }

    let rows =
        users.length > 0
            ? users
                  .filter((data) => {
                      const { fname, mname, lname } = data;
                      let name = `${fname} ${
                          mname ? `${mname.charAt(0)}.` : "N/A"
                      } ${lname}`.toLowerCase();

                      return curSearch.toLowerCase() === ""
                          ? data
                          : name.includes(curSearch.toLowerCase());
                  })
                  .filter((data) => {
                      return curFilter == "" || curFilter == "All"
                          ? data
                          : curFilter == data.role;
                  })
                  .map((dataMap) => {
                      const {
                          id,
                          fname,
                          mname,
                          lname,
                          role,
                          department,
                          uname,
                          email,
                          updated_at,
                      } = dataMap;
                      let name = `${
                          fname.charAt(0).toUpperCase() + fname.slice(1)
                      } ${mname ? `${mname.charAt(0).toUpperCase()}.` : " "} ${
                          lname.charAt(0).toUpperCase() + lname.slice(1)
                      }`;

                      let mnameVal = mname ? mname : " ";
                      return createData(
                          id,
                          name,
                          role,
                          department,
                          uname,
                          fname,
                          mnameVal,
                          lname,
                          email,
                          updated_at
                      );
                  })
            : [];

    // delete user
    const handleDelete = () => {
        axiosClient
            .delete(`/user/${curRow.id}`)
            .then(() => {
                setUsers(users.filter((user) => user.id !== curRow.id));

                axiosClient
                    .post("/activity", {
                        name: `${curUser.fname} ${curUser.lname}`,
                        activity: `Deleted ${curRow.fname} ${curRow.lname} at User Registration.`,
                        type: "Deleted",
                    })
                    .then((data) => {
                        if (data.status == 200 || data.status == 201) {
                            setOpenDel(false);
                            setVariant("success");
                            setMessage("User successfully deleted.");
                            setOpenToast(true);
                        } else {
                            console.log(data);
                        }
                    });
            })
            .catch((error) => {
                setVariant("error");
                setMessage(error.response.data.message);
                setOpenToast(true);
            });
    };
    return (
        <Body
            module={"User"}
            number={rows.length < 10 ? `0${rows.length}` : rows.length}
            rows={rows.length == 0 ? [] : rows}
            columns={columns}
            setOpen={setOpenAdd}
            addFormLayout={
                <UserForms
                    label={"Add new user"}
                    method={"ADD"}
                    form={form}
                    open={openAdd}
                    setOpen={setOpenAdd}
                    action={() => {
                        setOpenAdd(false);
                        form.resetForm();
                    }}
                />
            }
            editFormLayout={
                <UserForms
                    label={"Edit user"}
                    method={"EDIT"}
                    form={editForm}
                    open={openEdit}
                    setOpen={setOpenEdit}
                    action={() => setOpenEdit(false)}
                />
            }
            viewFormLayout={
                <UserForms
                    label={"View user"}
                    method={"VIEW"}
                    form={editForm}
                    open={openView}
                    setOpen={setOpenView}
                    action={() => setOpenView(false)}
                    disabled={true}
                    updated={curRow.updated_at}
                />
            }
            setOpenEdit={setOpenEdit}
            setCurRow={setCurRow}
            curRow={curRow}
            setCurSearch={setCurSearch}
            curSearch={curSearch}
            setCurFilter={setCurFilter}
            filterBy={filterBy}
            curFilter={curFilter}
            setOpenView={setOpenView}
            setOpenDel={setOpenDel}
            openDel={openDel}
            handleDelete={handleDelete}
            variant={variant}
            message={message}
            setOpenToast={setOpenToast}
            openToast={openToast}
        />
    );
};

export default UserRegPage;
