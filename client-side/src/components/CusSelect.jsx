import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useState } from "react";
const CusSelect = ({
    name,
    placeholder = "Select",
    label,
    required,
    error,
    items,
    onChange,
    value,
    touch,
    disabled,
}) => {
    return (
        <Box
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            w="100%"
            gap={0.5}
        >
            <InputLabel
                required={required}
                htmlFor={`${name}`}
                sx={{ fontSize: 11, fontWeight: "bold", color: "#1C3055" }}
            >
                {label}
            </InputLabel>

            <FormControl
                required={required}
                error={error && touch != undefined}
                fullWidth
            >
                <Select
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    displayEmpty
                    inputProps={{ "aria-label": "select" }}
                    sx={{
                        bgcolor: "#FFF",
                        borderRadius: 2,
                        textAlign: "left",
                        fontSize: 12,
                        height: 45,
                    }}
                    disabled={disabled}
                >
                    <MenuItem
                        value={""}
                        disabled
                        sx={{
                            fontSize: 12,
                        }}
                    >
                        <em>{placeholder}</em>
                    </MenuItem>

                    {items.map((item, key) => (
                        <MenuItem
                            value={item}
                            key={key}
                            sx={{
                                fontSize: 12,
                            }}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CusSelect;
