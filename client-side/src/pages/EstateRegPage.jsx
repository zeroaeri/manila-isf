import { Body } from "../layout";
import { useState } from "react";
import { EstateForms } from "../forms";
import { useData } from "../DataContext";
import axiosClient from "../axiosClient";
import { useFormik } from "formik";
import * as Yup from "yup";
const EstateRegPage = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [curSearch, setCurSearch] = useState("");
    const [curFilter, setCurFilter] = useState("All");
    const [variant, setVariant] = useState("");
    const [message, setMessage] = useState("");
    const { estates, setEstates, curUser } = useData();

    const [curRow, setCurRow] = useState({
        name: "",
        address: "",
        brgy: "",
        zone: "",
        district: "",
        housingQuan: "",
        status: "",
        updated_at: "",
        sqm: "",
    });

    const filterBy = ["All"];

    const form = useFormik({
        initialValues: {
            name: "",
            address: "",
            brgy: "",
            zone: "",
            district: "",
            housingQuan: "",
            status: "",
            sqm: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Estate is required."),
            housingQuan: Yup.number().required("Housing quantity is required."),
            status: Yup.string().required("Status is required."),
            address: Yup.string().required("Address is required."),
            brgy: Yup.number().required("Brgy is required."),
            zone: Yup.number().required("Zone is required."),
            district: Yup.number().required("District is required."),
            sqm: Yup.number().required("Estate size is required."),
        }),
        onSubmit: (value, actions) => {
            axiosClient
                .post("/estate", value)
                .then((data) => {
                    if (data.status == 200 || data.status == 201) {
                        setEstates([...estates, data.data]);

                        axiosClient
                            .post("/activity", {
                                name: `${curUser.fname} ${curUser.lname}`,
                                activity: `Added ${value.name} at Estate Registration.`,
                                type: "Added",
                            })
                            .then((data) => {
                                if (data.status == 200 || data.status == 201) {
                                    setVariant("success");
                                    setMessage("Estate successfully added.");
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
        },
    });

    const editForm = useFormik({
        initialValues: curRow,
        enableReinitialize: true,
        onSubmit: (value, actions) => {
            axiosClient
                .post(`/estate/${value.id}`, { ...value, _method: "PUT" })
                .then((data) => {
                    if (data.status == 200 || data.status == 201) {
                        setEstates(
                            estates.map((estate) =>
                                estate.id === data.data.id ? data.data : estate
                            )
                        );

                        axiosClient
                            .post("/activity", {
                                name: `${curUser.fname} ${curUser.lname}`,
                                activity: `Edited ${value.name} at Estate Registration.`,
                                type: "Edited",
                            })
                            .then((data) => {
                                if (data.status == 200 || data.status == 201) {
                                    setVariant("success");
                                    setMessage("Estate successfully edited.");
                                    setOpenToast(true);
                                } else {
                                    console.log(data.data.message);
                                }
                            });
                    } else {
                        console.log(data.message);
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

    const columns = [
        { id: "id", label: "ID", minWidth: 100 },
        { id: "name", label: "Name", minWidth: 170 },
        {
            id: "address",
            label: "Address",
            minWidth: 170,
        },

        {
            id: "brgy",
            label: "Brgy",
            minWidth: 70,
        },
        {
            id: "housingQuan",
            label: "No. of Housing",
            minWidth: 70,
        },
        {
            id: "sqm",
            label: "SQM",
            minWidth: 40,
        },

        {
            id: "status",
            label: "Status",
            minWidth: 150,
        },
    ];

    function createData(
        id,
        name,
        address,
        brgy,
        zone,
        district,
        housingQuan,
        status,
        sqm
    ) {
        return {
            id,
            name,
            address,
            brgy,
            zone,
            district,
            housingQuan,
            status,
            sqm,
        };
    }

    let rows =
        estates.length > 0
            ? estates
                  .filter((data) => {
                      const { name } = data;

                      return curSearch.toLowerCase() === ""
                          ? data
                          : name
                                .toLowerCase()
                                .includes(curSearch.toLowerCase());
                  })
                  .filter((data) => {
                      return curFilter == "" || curFilter == "All"
                          ? data
                          : curFilter == data.status;
                  })
                  .map((dataMap) => {
                      const {
                          id,
                          name,
                          address,
                          brgy,
                          zone,
                          district,
                          housingQuan,
                          status,

                          sqm,
                          updated_at,
                      } = dataMap;

                      return createData(
                          id,
                          name.charAt(0).toUpperCase() + name.slice(1),
                          address.charAt(0).toUpperCase() + address.slice(1),
                          brgy,
                          zone,
                          district,
                          housingQuan,
                          status,
                          sqm,
                          updated_at
                      );
                  })
            : [];

    const handleDelete = () => {
        axiosClient
            .delete(`/estate/${curRow.id}`)
            .then(() => {
                setEstates(estates.filter((estate) => estate.id !== curRow.id));
                setOpenDel(false);

                axiosClient
                    .post("/activity", {
                        name: `${curUser.fname} ${curUser.lname}`,
                        activity: `Deleted ${curRow.name} at Estate Registration.`,
                        type: "Deleted",
                    })
                    .then((data) => {
                        if (data.status == 200 || data.status == 201) {
                            setVariant("success");
                            setMessage("Estate successfully deleted.");
                            setOpenToast(true);
                        } else {
                            console.log(data.data.message);
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
        <>
            <Body
                module={"Estate"}
                number={rows.length < 10 ? `0${rows.length}` : rows.length}
                rows={rows.length == 0 ? [] : rows}
                columns={columns}
                setOpen={setOpenAdd}
                addFormLayout={
                    <EstateForms
                        label={"Add new estate"}
                        method={"ADD"}
                        open={openAdd}
                        setOpen={setOpenAdd}
                        form={form}
                        action={() => {
                            setOpenAdd(false);
                            form.resetForm();
                        }}
                    />
                }
                editFormLayout={
                    <EstateForms
                        label={"Edit estate"}
                        method={"EDIT"}
                        form={editForm}
                        open={openEdit}
                        setOpen={setOpenEdit}
                        action={() => setOpenEdit(false)}
                    />
                }
                viewFormLayout={
                    <EstateForms
                        label={"View estate"}
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
        </>
    );
};

export default EstateRegPage;
