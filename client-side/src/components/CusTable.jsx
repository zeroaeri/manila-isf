import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { CusIconBtn } from "./CusButton";
import {
    RemoveRedEyeRounded,
    EditRounded,
    DeleteRounded,
} from "@mui/icons-material";
import CusAlert from "./CusAlert";

const CusTable = ({
    rows,
    columns,
    curRow,
    setOpenEdit,
    setCurRow,
    sortType,
    setOpenView,
    setOpenDel,
    openDel,
    handleDelete,
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    rows.sort((a, b) => {
        if (sortType == "Ascending") {
            return a.name.toString().localeCompare(b.name);
        } else if (sortType == "Descending") {
            return b.name.toString().localeCompare(a.name);
        }
    });

    return (
        <Paper
            sx={{
                width: "100%",
                overflow: "hidden",
                boxShadow: "0px 0px 2px rgba(76, 96, 133, 0.6)",
                border: "none",
            }}
        >
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={"left"}
                                    style={{
                                        minWidth: column.minWidth,
                                        backgroundColor: "#EFF1F4",
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                align={"right"}
                                style={{
                                    backgroundColor: "#EFF1F4",
                                    paddingRight: 30,
                                }}
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {rows.length > 0 ? (
                        <TableBody>
                            {rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        sx={{ fontSize: 12 }}
                                                    >
                                                        {column.format &&
                                                        typeof value ===
                                                            "number"
                                                            ? column.format(
                                                                  value
                                                              )
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align={"right"}>
                                                <Stack
                                                    flexDirection={"row"}
                                                    gap={1}
                                                    justifyContent={"flex-end"}
                                                >
                                                    <CusIconBtn
                                                        color="#f1e6bd"
                                                        w={24}
                                                        h={24}
                                                        action={() => {
                                                            setOpenView(true);
                                                            setCurRow(row);
                                                        }}
                                                        icon={
                                                            <RemoveRedEyeRounded
                                                                sx={{
                                                                    height: 15,
                                                                    width: 15,
                                                                    color: "#1C3055",
                                                                }}
                                                            />
                                                        }
                                                    />
                                                    <CusIconBtn
                                                        color="#ccdace"
                                                        w={24}
                                                        h={24}
                                                        action={() => {
                                                            setOpenEdit(true);
                                                            setCurRow(row);
                                                        }}
                                                        icon={
                                                            <EditRounded
                                                                sx={{
                                                                    height: 15,
                                                                    width: 15,
                                                                    color: "#1C3055",
                                                                }}
                                                            />
                                                        }
                                                    />
                                                    <CusIconBtn
                                                        color="#eaa196"
                                                        w={24}
                                                        h={24}
                                                        action={() => {
                                                            setOpenDel(true);
                                                            setCurRow(row);
                                                        }}
                                                        icon={
                                                            <DeleteRounded
                                                                sx={{
                                                                    height: 15,
                                                                    width: 15,
                                                                    color: "#1C3055",
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 1}
                                    align="center"
                                >
                                    <Typography sx={{ fontSize: 12 }}>
                                        No available data.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <CusAlert
                setOpen={setOpenDel}
                open={openDel}
                name={curRow.name}
                handleDelete={handleDelete}
            />
        </Paper>
    );
};

export default CusTable;
