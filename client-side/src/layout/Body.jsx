import Header from "./Header";
import { Stack, Box } from "@mui/material";
import {
    CusSearch,
    CusPrimBtn,
    CusTable,
    CusSort,
    CusFilter,
    CusToast,
    CusDownload,
} from "../components";
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const Body = ({
    moduleHeader,
    module,
    number,
    rows,
    columns,
    setOpen,
    addFormLayout,
    editFormLayout,
    setOpenEdit,
    setCurRow,
    curRow,
    setCurSearch,
    curSearch,
    setCurFilter,
    filterBy,
    curFilter,
    viewFormLayout,
    setOpenView,
    setOpenDel,
    openDel,
    handleDelete,
    variant,
    message,
    openToast,
    setOpenToast,
    location,
    filterLabel,
}) => {
    const [sortType, setSortType] = useState("Ascending");
    const [anchorEl, setAnchorEl] = useState(null);

    const generatePdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [columns.map((column) => column.label)],
            body: rows.map((row) => columns.map((column) => row[column.id])),
            startY: 20,
            styles: { overflow: "linebreak" },
            didDrawPage: () => {
                // Header
                doc.text(`${module}s`, 10, 10);
            },
        });
        doc.save(`${module}.pdf`);
    };

    const handleDlClick = (event) => {
        setAnchorEl(event.currentTarget);
        generatePdf();
    };
    return (
        <Stack gap={3}>
            <Header
                module={module == "ISF" ? moduleHeader : module}
                number={number}
                location={location}
            />
            <Box
                bgcolor={"#fff"}
                sx={{
                    borderRadius: 3,
                    boxShadow: "0px 0px 5px rgba(76, 96, 133, 0.3)",
                }}
                p={3}
                display={"flex"}
                flexDirection={"column"}
                gap={3}
            >
                <Stack
                    display={"flex"}
                    justifyContent={"space-between"}
                    flexDirection={{
                        xs: "column",
                        sm: "row",
                        row: "column",
                        lg: "row",
                    }}
                    width={"100%"}
                    gap={1}
                >
                    <CusSearch
                        setCurSearch={setCurSearch}
                        curSearch={curSearch}
                    />

                    <Stack
                        gap={2}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                    >
                        <Stack
                            justifyContent={{ xs: "flex-start" }}
                            flexDirection={"row"}
                            gap={2}
                        >
                            <CusSort
                                setSortType={setSortType}
                                sortType={sortType}
                            />

                            <CusFilter
                                filterBy={filterBy}
                                setCurFilter={setCurFilter}
                                curFilter={curFilter}
                                label={filterLabel}
                            />
                            <CusDownload
                                handleClick={handleDlClick}
                                anchorEl={anchorEl}
                            />
                        </Stack>
                        <CusPrimBtn
                            label={`+ Add ${module}`}
                            action={() => setOpen(true)}
                        />
                        {addFormLayout}
                        {editFormLayout}
                        {viewFormLayout}
                    </Stack>
                </Stack>

                <CusTable
                    rows={rows}
                    columns={columns}
                    setOpenEdit={setOpenEdit}
                    setCurRow={setCurRow}
                    curRow={curRow}
                    sortType={sortType}
                    setOpenView={setOpenView}
                    setOpenDel={setOpenDel}
                    openDel={openDel}
                    handleDelete={handleDelete}
                />
            </Box>
            <CusToast
                variant={variant}
                message={message}
                openToast={openToast}
                setOpenToast={setOpenToast}
            />
        </Stack>
    );
};

export default Body;
