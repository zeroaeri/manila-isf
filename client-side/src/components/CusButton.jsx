import { Button, IconButton } from "@mui/material";

export const CusPrimBtn = ({
    label,
    action,
    type,
    color = "#4C6085",
    hover = "#3C4D6C",
    w = "100%",
}) => {
    return (
        <>
            <Button
                variant={"contained"}
                sx={{
                    backgroundColor: color,
                    "&:hover": {
                        backgroundColor: hover,
                    },
                    fontWeight: "bold",
                    width: w,
                }}
                onClick={action}
                type={type}

                // fullWidth
            >
                {label}
            </Button>
        </>
    );
};

export const CusSecBtn = ({
    label,
    action,
    type,
    color = "#4C6085",
    height,
}) => {
    return (
        <>
            <Button
                variant={"outlined"}
                sx={{
                    borderColor: color,
                    "&:hover": {
                        backgroundColor: "#EFF1F4",
                        borderColor: "#4C6085",
                    },
                    fontWeight: "bold",
                    color: color,
                    height: 43.5,
                    borderRadius: 1.5,
                }}
                onClick={action}
                type={type}
                fullWidth
            >
                {label}
            </Button>
        </>
    );
};

export const CusIconBtn = ({
    icon,
    w = 40,
    h = 40,
    color = "#E0EBF2",
    action,
    label,
    text,
    hover = "#EFF1F4",
    ...props
}) => {
    return (
        <IconButton
            color="inherit"
            size="small"
            aria-label={label}
            edge="start"
            sx={{
                width: w,
                height: h,
                borderRadius: 1,
                borderWidth: 2,
                bgcolor: color,
                "&:hover": {
                    bgcolor: hover,
                },
            }}
            onClick={action}
            {...props}
        >
            {icon}
            {text}
        </IconButton>
    );
};

export const CusThirdBtn = ({ label, action, type }) => {
    return (
        <>
            <Button
                variant={"link"}
                sx={{
                    "&:hover": {
                        backgroundColor: "#E0EBF2",
                        borderColor: "#4C6085",
                        fontWeight: "bold",
                    },
                    fontWeight: "medium",
                    color: "#4C6085",

                    fontSize: 11,
                    width: 130,
                    textTransform: "inherit",
                }}
                onClick={action}
                type={type}
                fullWidth={false}
            >
                {label}
            </Button>
        </>
    );
};
