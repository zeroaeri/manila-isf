import { Body } from "../layout";
import { useState } from "react";
import { DistrictForms } from "../forms";
import { useData } from "../DataContext";
import axiosClient from "../axiosClient";
import { useFormik } from "formik";
import * as Yup from "yup";

const DistrictRegPage = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [curSearch, setCurSearch] = useState("");
    const [curFilter, setCurFilter] = useState("All");
    const [variant, setVariant] = useState("");
    const [message, setMessage] = useState("");
    const { districts, setDistricts, curUser } = useData();

    const [curRow, setCurRow] = useState({
        name: "",
        startZone: "",
        endZone: "",
        startBrgy: "",
        endBrgy: "",
        updated_at: "",
    });

    const filterBy = ["All"];

    const form = useFormik({
        initialValues: {
            name: "",
            startZone: "",
            endZone: "",
            startBrgy: "",
            endBrgy: "",
        },
        validationSchema: Yup.object({
            name: Yup.number().required("District number is required."),
            startZone: Yup.number().required("Start zone is required."),
            endZone: Yup.number()
                .required("End zone is required.")
                .min(
                    Yup.ref("startZone"),
                    "End zone must be greater than start zone."
                ),
            startBrgy: Yup.number().required("Start brgy is required."),
            endBrgy: Yup.number()
                .required("End brgy is required.")
                .min(
                    Yup.ref("startBrgy"),
                    "End brgy must be greater than start brgy."
                ),
        }),
        onSubmit: (value, actions) => {
            axiosClient
                .post("/district", value)
                .then((data) => {
                    if (data.status == 200 || data.status == 201) {
                        setDistricts([...districts, data.data]);

                        axiosClient
                            .post("/activity", {
                                name: `${curUser.fname} ${curUser.lname}`,
                                activity: `Added ${value.name} at District Registration.`,
                                type: "Added",
                            })
                            .then((data) => {
                             
                                if (data.status == 200 || data.status == 201) {
                                    setVariant("success");
                                    setMessage("District successfully added.");
                                    setOpenToast(true);
                                } else {
                                    console.log(data.data.message);
                                }
                            })
                    } else {
                        console.log(data.data.message);
                    }
                })
                .catch((error) => {
                    setVariant("error");
                    console.log(error)
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
                .post(`/district/${value.id}`, { ...value, _method: "PUT" })
                .then((data) => {
                    if (data.status == 200 || data.status == 201) {
                        setDistricts(
                            districts.map((district) =>
                                district.id === data.data.id
                                    ? data.data
                                    : district
                            )
                        );

                        axiosClient
                            .post("/activity", {
                                name: `${curUser.fname} ${curUser.lname}`,
                                activity: `Edited ${value.name} at District Registration.`,
                                type: "Edited",
                            })
                            .then((data) => {
                            
                                if (data.status == 200 || data.status == 201) {
                                    setVariant("success");
                                    setMessage("District successfully edited.");
                                    setOpenToast(true);
                                } else {
                                    console.log(data)
                                    console.log(data.data.message);
                                }
                            }).catch((err => {
                                console.log(err)
                            }));
                    } else {
                        console.log(data.message);
                    }
                })
                .catch((error) => {
                    setVariant("error");
                    console.log(error)
                    setMessage(error.response.data.message);
                    setOpenToast(true);
                });
            setOpenEdit(false);
        },
    });

    const columns = [
        { id: "id", label: "ID", minWidth: 100 },
        { id: "disName", label: "District", minWidth: 170 },
        {
            id: "zone",
            label: "Zone",
            minWidth: 170,
        },
        {
            id: "brgy",
            label: "Brgy",
            minWidth: 170,
        },
    ];

    function createData(
        id,
        disName,
        zone,
        brgy,
        updated_at,
        startZone,
        endZone,
        startBrgy,
        endBrgy,
        name
    ) {
        return {
            id,
            disName,
            name,
            zone,
            brgy,
            updated_at,
            startZone,
            endZone,
            startBrgy,
            endBrgy,
        };
    }

    let rows =
        districts.length > 0
            ? districts
                  .filter((data) => {
                      const { name } = data;
                      let disName = `District ${name}`.toLowerCase();
                      return curSearch.toLowerCase() === ""
                          ? data
                          : disName.includes(curSearch.toLowerCase());
                  })
                  .filter((data) => {
                      return curFilter == "" || curFilter == "All"
                          ? data
                          : curFilter == data.disName;
                  })
                  .map((dataMap) => {
                      const {
                          id,
                          name,
                          startZone,
                          endZone,
                          startBrgy,
                          endBrgy,
                          updated_at,
                      } = dataMap;

                      let disName = `District ${name}`;
                      let zone = `Zone ${startZone} - ${endZone}`;
                      let brgy = `Brgy ${startBrgy} - ${endBrgy}`;
                      return createData(
                          id,
                          disName,
                          zone,
                          brgy,
                          updated_at,
                          startZone,
                          endZone,
                          startBrgy,
                          endBrgy,
                          name
                      );
                  })
            : [];

    const handleDelete = () => {
        axiosClient
            .delete(`/district/${curRow.id}`)
            .then(() => {
                setDistricts(
                    districts.filter((district) => district.id !== curRow.id)
                );
                setOpenDel(false);

                axiosClient
                    .post("/activity", {
                        name: `${curUser.fname} ${curUser.lname}`,
                        activity: `Deleted ${curRow.name} at District Registration.`,
                        type: "Deleted",
                    })
                    .then((data) => {
                    
                        if (data.status == 200 || data.status == 201) {
                            setVariant("success");
                            setMessage("District successfully deleted.");
                            setOpenToast(true);
                        } else {
                            console.log(data.data.message);
                        }
                    });
            })
            .catch((error) => {
                setVariant("error");
                console.log(error)
                setMessage(error.response.data.message);
                setOpenToast(true);
            });
    };

    return (
        <>
            <Body
                module={"District"}
                number={rows.length < 10 ? `0${rows.length}` : rows.length}
                rows={rows.length == 0 ? [] : rows}
                columns={columns}
                setOpen={setOpenAdd}
                addFormLayout={
                    <DistrictForms
                        label={"Add new district"}
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
                    <DistrictForms
                        label={"Edit district"}
                        method={"EDIT"}
                        form={editForm}
                        open={openEdit}
                        setOpen={setOpenEdit}
                        action={() => setOpenEdit(false)}
                    />
                }
                viewFormLayout={
                    <DistrictForms
                        label={"View district"}
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

export default DistrictRegPage;
