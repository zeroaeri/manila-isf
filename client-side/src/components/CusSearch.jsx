import * as React from "react";

import { Search } from "@mui/icons-material";
import { InputAdornment, Input } from "@mui/material";

const CusSearch = ({ setCurSearch, curSearch, label = "name" }) => {
    return (
        <Input
            placeholder={`Search by ${label}`}
            inputProps={{ "aria-label": "search" }}
            disableUnderline
            sx={{
                bgcolor: "#FFF",
                borderRadius: 2,
                paddingY: 1,
                paddingX: 2,
                boxShadow: "0px 0px 2px rgba(76, 96, 133, 0.6)",
                textAlign: "left",
                fontSize: 12,
            }}
            startAdornment={
                <InputAdornment position="start">
                    <Search
                        sx={{
                            color: "#CBD1DC",
                        }}
                    />
                </InputAdornment>
            }
            onChange={(e) => {
                setCurSearch(e.target.value);
            }}
            value={curSearch}
        />
    );
};

export default CusSearch;
