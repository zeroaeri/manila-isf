import Header from "./Header";
import { Stack, Box } from "@mui/material";
import { CusSearch, CusSort, CusFilter, CusTableLog } from "../components";
import { useState } from "react";
const BodyLog = ({
    moduleHeader,
    module,
    number,
    location,
    rows,
    columns,
    setCurSearch,
    curSearch,
    setCurFilter,
    filterBy,
    curFilter,
    filterLabel,
}) => {
    const [sortType, setSortType] = useState("Ascending");
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <Stack gap={3}>
            <Header
                module={module}
                number={number}
                location={location}
                log={true}
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
                        label={"activity"}
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
                        </Stack>
                    </Stack>
                </Stack>

                <CusTableLog
                    rows={rows}
                    columns={columns}
                    sortType={sortType}
                />
            </Box>
        </Stack>
    );
};

export default BodyLog;
