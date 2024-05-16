import {
    Box,
    Input,
    FormControl,
    InputLabel,
    FormHelperText,
    InputAdornment,
} from "@mui/material";
export const CusLogInput = ({
    name,
    placeholder,
    label,
    required,
    error,
    adornment,
    value,
    onChange,
    type = "text",
    endAdornment,
    onBlur,
    touch,
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
                <Input
                    name={name}
                    placeholder={placeholder}
                    variant="filled"
                    fullWidth
                    width="100%"
                    sx={{
                        bgcolor: "#FFF",
                        borderRadius: 2,
                        paddingY: 1,
                        paddingX: 2,
                        boxShadow: "0 0 8px rgba(28, 48, 85, 0.3)",
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
                    startAdornment={
                        <InputAdornment position="start">
                            {adornment}
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            {endAdornment}
                        </InputAdornment>
                    }
                    type={type}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
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

export const CusFormInput = ({
    name,
    placeholder,
    label,
    required,
    error,
    type = "text",
    value,
    onChange,
    onBlur,
    touch,
    disabled,
    endAdornment,
    inputProps,
    multiline,
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
                sx={{
                    fontSize: 11,
                    fontWeight: "bold",
                    color: "#1C3055",
                }}
            >
                {label}
            </InputLabel>
            <FormControl
                required={required}
                error={error && touch != undefined}
                variant="standard"
                fullWidth
            >
                <Input
                    name={name}
                    placeholder={`${placeholder}`}
                    variant="filled"
                    disableUnderline
                    fullWidth
                    width="100%"
                    type={type}
                    sx={{
                        bgcolor: "#FFF",
                        borderRadius: 2,
                        paddingY: 1,
                        paddingX: 2,
                        ":hover": { borderColor: "#000" },
                        textAlign: "left",
                        fontSize: 12,
                        border: 1,

                        borderColor: "rgba(28, 48, 85, 0.3)",
                    }}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    disabled={disabled}
                    endAdornment={
                        <InputAdornment position="end">
                            {endAdornment}
                        </InputAdornment>
                    }
                    inputProps={inputProps}
                    multiline={multiline}
                    rows={multiline ? 3 : 1}
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
