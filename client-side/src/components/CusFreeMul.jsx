import * as React from "react";
import {
    Chip,
    Autocomplete,
    TextField,
    Box,
    Input,
    FormControl,
    InputLabel,
    FormHelperText,
} from "@mui/material";

const CusFreeMul = ({
    name,
    placeholder,
    label,
    required,
    error,
    value,
    onChange,
    type = "text",
    onBlur,
    touch,
    options,
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
                variant="standard"
                fullWidth
            >
                <Autocomplete
                    onChange={onChange}
                    onBlur={onBlur}
                    // value={value}
                    multiple
                    id={name}
                    fullWidth
                    options={options}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={placeholder}
                            hiddenLabel
                            size="small"
                            multiline
                            fullWidth
                            sx={{
                                bgcolor: "#FFF",
                                textAlign: "left",
                                fontSize: 12,

                                ":before": {
                                    borderBottomColor: "#4C6085",
                                    borderRadius: 2,
                                },
                                ":after": {
                                    display: "none",
                                },
                            }}
                        />
                    )}
                />

                {error && touch ? (
                    <FormHelperText sx={{ fontSize: 11 }}>
                        {error}
                    </FormHelperText>
                ) : (
                    <></>
                )}
            </FormControl>
        </Box>
    );
};

export default CusFreeMul;
