import { useState } from "react";
import { CusIconBtn } from "./CusButton";
import { Menu, MenuItem, Fade, Typography, ListItemIcon } from "@mui/material";
import { FilterAltOutlined, Check } from "@mui/icons-material";

const CusFilter = ({
    filterBy,
    setCurFilter,
    curFilter,
    label = "Position",
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (by) => {
        setCurFilter(by);
        setAnchorEl(null);
    };

    return (
        <>
            <CusIconBtn
                icon={
                    <FilterAltOutlined
                        sx={{ height: 20, width: 20, color: "#1C3055" }}
                    />
                }
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                action={handleClick}
            />

            <Menu
                id="fade-menu"
                MenuListProps={{
                    "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <Typography
                    sx={{
                        fontSize: 11,
                        paddingLeft: 1,
                        fontWeight: "bold",
                        color: " #1c3055",
                        paddingBottom: 0.5,
                    }}
                >
                    By {label}
                </Typography>

                {filterBy.map((by, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleMenuItemClick(by)}
                        sx={{ fontSize: 12 }}
                    >
                        <ListItemIcon sx={{ marginRight: -1.5 }}>
                            {by == curFilter && <Check fontSize="12" />}
                        </ListItemIcon>
                        {by}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default CusFilter;
