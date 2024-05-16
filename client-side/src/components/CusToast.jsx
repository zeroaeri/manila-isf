import { Snackbar, Alert } from "@mui/material";
const CusToast = ({ variant, message, openToast, setOpenToast }) => {
    return (
        <Snackbar
            open={openToast}
            autoHideDuration={6000}
            onClose={() => setOpenToast(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                onClose={() => setOpenToast(false)}
                severity={variant}
                sx={{ width: "100%" }}
                variant="filled"
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CusToast;
