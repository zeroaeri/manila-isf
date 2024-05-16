import { Body } from "../layout";
import { useState } from "react";
import { AwardeeForms } from "../forms";
import { useData } from "../DataContext";
import axiosClient from "../axiosClient";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
const AwardeeRegPage = () => {
    const { name } = useParams();
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [curSearch, setCurSearch] = useState("");
    const [curFilter, setCurFilter] = useState("All");
    const [variant, setVariant] = useState("");
    const [message, setMessage] = useState("");

    const { estates, setAwardees, awardees , curUser} = useData();
    const estateInfo = estates.find((est) => `${est.name}` === name);

    const [curRow, setCurRow] = useState({
        name: "",
        members: [],
        amortization: "",
        arrears: "",
        district: estateInfo ? estateInfo.name : "",
        remarks: "",
        entitlement: "",
    });

    const filterBy = ["All"];

    const form = useFormik({
        initialValues: {
            name: "",
            members: [],
            amortization: "",
            arrears: "",
            estate: estateInfo ? estateInfo.name : "",
            remarks: "",
            entitlement: "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Awardee name is required."),
            entitlement: Yup.string().required("Entitlement is required."),
        }),
        onSubmit: (value, actions) => {
            axiosClient
                .post("/awardee", value)
                .then((data) => {
                    if (data.status == 200 || data.status == 201) {
                        setAwardees([...awardees, data.data]);
                        axiosClient
                            .post("/activity", {
                                name: `${curUser.fname} ${curUser.lname}`,
                                activity: `Added ${value.name} at Awardee Registration.`,
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
            let mem = Array.isArray(value.members)
                ? value.members.filter(
                      (mem, index) => value.members.indexOf(mem) === index
                  )
                : [];
            value.members = mem ? mem : value.members;

            axiosClient
                .post(`/awardee/${value.id}`, { ...value, _method: "PUT" })
                .then((data) => {
                    if (data.status == 200 || data.status == 201) {
                        setAwardees(
                            awardees.map((awardee) =>
                                awardee.id === data.data.id
                                    ? data.data
                                    : awardee
                            )
                        );

                        axiosClient
                            .post("/activity", {
                                name: `${curUser.fname} ${curUser.lname}`,
                                activity: `Edited ${value.name} at Awardee Registration.`,
                                type: "Edited",
                            })
                            .then((data) => {
                                if (data.status == 200 || data.status == 201) {
                                    setVariant("success");
                                    setMessage("Awardee successfully edited.");
                                    setOpenToast(true);
                                } else {
                                    console.log(data.data.message);
                                }
                            });
                    } else {
                        setVariant("error");
                        setMessage("No members added.");
                        setOpenToast(true);
                    }
                })
                .catch((error) => {
                    setVariant("error");
                    setMessage(error.response.data.message);
                    setOpenToast(true);
                });

            actions.resetForm();
            setCurRow({ ...curRow, mem: [] });
            setOpenEdit(false);
        },
    });

    const columns = [
        { id: "id", label: "ID", minWidth: 20 },
        { id: "name", label: "Awardee", minWidth: 80 },
        {
            id: "members",
            label: "Members",
            minWidth: 170,
        },

        {
            id: "amortization",
            label: "Amortization",
            minWidth: 80,
        },
        {
            id: "arrears",
            label: "Arrears",
            minWidth: 50,
        },

        {
            id: "remarks",
            label: "Remarks",
            minWidth: 100,
        },
    ];

    function createData(
        id,
        name,
        members,
        amortization,
        arrears,
        estate,
        remarks,
        entitlement,
        updated_at
    ) {
        return {
            id,
            name,
            members,
            amortization,
            arrears,
            estate,
            remarks,
            entitlement,
            updated_at,
        };
    }

    let rows =
        awardees.length > 0
            ? awardees
                  .filter((data) => {
                      return data.estate == estateInfo.name;
                  })
                  .filter((data) => {
                      return curSearch.toLowerCase() === ""
                          ? data
                          : data.name
                                .toLowerCase()
                                .includes(curSearch.toLowerCase());
                  })
                  .filter((data) => {
                      return curFilter == "" || curFilter == "All"
                          ? data
                          : curFilter == data.typeLocation;
                  })
                  .map((dataMap) => {
                      const {
                          id,
                          name,
                          members,
                          amortization,
                          arrears,
                          estate,
                          remarks,
                          entitlement,
                          updated_at,
                      } = dataMap;

                      return createData(
                          id,
                          name.charAt(0).toUpperCase() + name.slice(1),
                          members,
                          amortization,
                          arrears,
                          estate,
                          remarks,
                          entitlement,
                          updated_at
                      );
                  })
            : [];

    const handleDelete = () => {
        axiosClient
            .delete(`/awardee/${curRow.id}`)
            .then(() => {
                setAwardees(
                    awardees.filter((awardee) => awardee.id !== curRow.id)
                );
                setOpenDel(false);

                axiosClient
                    .post("/activity", {
                        name: `${curUser.fname} ${curUser.lname}`,
                        activity: `Deleted ${curRow.name} at Awardee Registration.`,
                        type: "Deleted",
                    })
                    .then((data) => {
                        if (data.status == 200 || data.status == 201) {
                            setVariant("success");
                            setMessage("Awardee successfully deleted.");
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
            {estateInfo && (
                <Body
                    moduleHeader={"Estate Awardees"}
                    module={"Estate Awardees"}
                    location={estateInfo.name ? ` ${estateInfo.name} ` : ``}
                    number={rows.length < 10 ? `0${rows.length}` : rows.length}
                    rows={rows.length == 0 ? [] : rows}
                    columns={columns}
                    setOpen={setOpenAdd}
                    addFormLayout={
                        <AwardeeForms
                            label={"Add new Awardee"}
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
                        <AwardeeForms
                            label={"Edit Awardee"}
                            method={"EDIT"}
                            form={editForm}
                            open={openEdit}
                            setOpen={setOpenEdit}
                            action={() => setOpenEdit(false)}
                            curRow={curRow}
                        />
                    }
                    viewFormLayout={
                        <AwardeeForms
                            label={"View Awardee"}
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
                    filterLabel={"Location Type"}
                    setOpenView={setOpenView}
                    setOpenDel={setOpenDel}
                    openDel={openDel}
                    handleDelete={handleDelete}
                    variant={variant}
                    message={message}
                    setOpenToast={setOpenToast}
                    openToast={openToast}
                />
            )}
        </>
    );
};

export default AwardeeRegPage;
