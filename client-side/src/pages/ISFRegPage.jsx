import { Body } from "../layout";
import { useState } from "react";
import { ISFForms } from "../forms";
import { useData } from "../DataContext";
import axiosClient from "../axiosClient";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

const ISFRegPage = () => {
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

    const { districts, setISFs, isfs, curUser } = useData();
    const districtInfo = districts.find(
        (dst) => `district${dst.name}` === name
    );

    const [curRow, setCurRow] = useState({
        name: "",
        bday: "",
        civilStat: "",
        childQuan: "",
        incomeBracket: "",
        district: districtInfo ? districtInfo.name : "",
        zone: "",
        brgy: "",
        typeLocation: "",
        specLocation: "",
        descLocation: "",
        imgLoc: "",
    });

    const filterBy = [
        "Government Properties",
        "Public Properties",
        "Private Properties",
        "Others",
        "All",
    ];
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];

    const form = useFormik({
        initialValues: {
            name: "",
            bday: "",
            civilStat: "",
            childQuan: 0,
            incomeBracket: "",
            district: districtInfo ? districtInfo.name : "",
            zone: 0,
            brgy: 0,
            typeLocation: "",
            specLocation: "",
            imgLoc: "",
            descLocation: "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Head of the family is required."),
            bday: Yup.string().required("Birthday is required."),
            civilStat: Yup.string().required("Civil Status is required."),
            incomeBracket: Yup.string().required("Income bracket is required."),
            brgy: Yup.number().required("Brgy is required."),
            zone: Yup.number().required("Zone is required."),
            district: Yup.number().required("District is required."),
            typeLocation: Yup.string().required("Location type is required."),
            specLocation: Yup.string().required(
                "Specific location is required."
            ),
            imgLoc: Yup.mixed().test(
                "fileFormat",
                "Image format must be jpg/jpeg/gif/png only.",
                (value) => value && SUPPORTED_FORMATS.includes(value.type)
            ),
        }),
        onSubmit: (value, actions) => {
            axiosClient
                .post("/isf", value)
                .then((data) => {
                    if (data.status == 200 || data.status == 201) {
                        setISFs([...isfs, data.data]);

                        axiosClient
                            .post("/activity", {
                                name: `${curUser.fname} ${curUser.lname}`,
                                activity: `Added ${value.name} at ISF Registration.`,
                                type: "Added",
                            })
                            .then((data) => {
                                if (data.status == 200 || data.status == 201) {
                                    setVariant("success");
                                    setMessage("ISF successfully added.");
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
                    setVariant('error');
                    setMessage(error.response.data.message);
                    setOpenToast(true);
                    console.log(error);
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
                .post(`/isf/${value.id}`, { ...value, _method: "PUT" })
                .then((data) => {
                    if (data.status == 200 || data.status == 201) {
                        console.log(data.data, data);
                        setISFs(
                            isfs.map((isf) =>
                                isf.id === data.data.id ? data.data : isf
                            )
                        );

                        axiosClient
                            .post("/activity", {
                                name: `${curUser.fname} ${curUser.lname}`,
                                activity: `Edited ${value.name} at ISF Registration.`,
                                type: "Edited",
                            })
                            .then((data) => {
                                if (data.status == 200 || data.status == 201) {
                                    setVariant("success");
                                    setMessage("ISF successfully edited.");
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
        { id: "id", label: "ID", minWidth: 50 },
        { id: "name", label: "Head of the Family", minWidth: 170 },
        {
            id: "incomeBracket",
            label: "Income Bracket",
            minWidth: 50,
        },

        {
            id: "brgy",
            label: "Brgy",
            minWidth: 50,
        },
        {
            id: "zone",
            label: "Zone",
            minWidth: 50,
        },
        {
            id: "childQuan",
            label: "No. of Children",
            minWidth: 50,
        },
        {
            id: "typeLocation",
            label: "Location Type",
            minWidth: 100,
        },
        {
            id: "specLocation",
            label: "Specific Location",
            minWidth: 100,
        },
    ];

    function createData(
        id,
        name,
        specLocation,
        typeLocation,
        bday,
        incomeBracket,
        childQuan,
        civilStat,
        descLocation,
        zone,
        brgy,
        district,
        imgLoc,
        updated_at
    ) {
        return {
            id,
            name,
            specLocation,
            typeLocation,
            bday,
            incomeBracket,
            childQuan,
            civilStat,
            descLocation,
            zone,
            brgy,
            district,
            imgLoc,
            updated_at,
        };
    }

    let rows =
        isfs.length > 0
            ? isfs
                  .filter((data) => {
                      return data.district == districtInfo.name;
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
                          specLocation,
                          typeLocation,
                          bday,
                          incomeBracket,
                          childQuan,
                          civilStat,
                          descLocation,
                          district,
                          brgy,
                          zone,
                          imgLoc,
                          updated_at,
                      } = dataMap;
                      return createData(
                          id,
                          name.charAt(0).toUpperCase() + name.slice(1),
                          specLocation,
                          typeLocation,
                          bday,
                          incomeBracket,
                          childQuan,
                          civilStat,
                          descLocation,
                          zone,
                          brgy,
                          district,
                          imgLoc,
                          updated_at
                      );
                  })
            : [];

    const handleDelete = () => {
        axiosClient
            .delete(`/isf/${curRow.id}`)
            .then(() => {
                setISFs(isfs.filter((isf) => isf.id !== curRow.id));
                setOpenDel(false);

                axiosClient
                    .post("/activity", {
                        name: `${curUser.fname} ${curUser.lname}`,
                        activity: `Deleted ${curRow.name} at ISF Registration.`,
                        type: "Deleted",
                    })
                    .then((data) => {
                        if (data.status == 200 || data.status == 201) {
                            setVariant("success");
                            setMessage("ISF successfully deleted.");
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
            {districtInfo && (
                <Body
                    moduleHeader={"Informal Settlers Family (ISFs)"}
                    module={"ISF"}
                    location={
                        districtInfo.name
                            ? `District ${districtInfo.name} `
                            : `district`
                    }
                    number={rows.length < 10 ? `0${rows.length}` : rows.length}
                    rows={rows.length == 0 ? [] : rows}
                    columns={columns}
                    setOpen={setOpenAdd}
                    addFormLayout={
                        <ISFForms
                            label={"Add new ISF"}
                            method={"ADD"}
                            open={openAdd}
                            setOpen={setOpenAdd}
                            form={form}
                            action={() => {
                                setOpenAdd(false);
                                form.resetForm();
                                // form.setFieldValue("imgLoc", null);
                            }}
                        />
                    }
                    editFormLayout={
                        <ISFForms
                            label={"Edit ISF"}
                            method={"EDIT"}
                            form={editForm}
                            open={openEdit}
                            setOpen={setOpenEdit}
                            action={() => setOpenEdit(false)}
                        />
                    }
                    viewFormLayout={
                        <ISFForms
                            label={"View ISF"}
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

export default ISFRegPage;
