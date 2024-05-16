import { useState } from "react";
import { CusIconBtn } from "./CusButton";
import { Menu, MenuItem, Fade, Typography, ListItemIcon } from "@mui/material";
import { SwapVertOutlined, Check } from "@mui/icons-material";

const CusSort = ({ setSortType, sortType }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (by) => {
        setSortType(by);
        setAnchorEl(null);
    };

    const choice = ["Ascending", "Descending"];
    return (
        <>
            <CusIconBtn
                icon={
                    <SwapVertOutlined
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
                    By Name
                </Typography>

                {choice.map((by, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleMenuItemClick(by)}
                        sx={{ fontSize: 12 }}
                    >
                        <ListItemIcon sx={{ marginRight: -1.5 }}>
                            {by == sortType && <Check fontSize="12" />}
                        </ListItemIcon>
                        {by}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default CusSort;
