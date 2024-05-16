import {
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    Dialog,
    Stack,
    Slide,
    IconButton,
    Box,
    Divider,
} from "@mui/material";
import { forwardRef } from "react";
import { CusSecBtn, CusPrimBtn } from "./CusButton";
import { CloseRounded } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CusAlert({ open, setOpen, name, handleDelete }) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Box
                    display="flex"
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <DialogTitle fontSize={16}>Delete {name}</DialogTitle>
                    <IconButton onClick={handleClose}>
                        <CloseRounded sx={{ color: "#4C6085", fontSize: 16 }} />
                    </IconButton>
                </Box>
                <Divider />

                <DialogContent>
                    <DialogContentText
                        fontSize={14}
                        id="alert-dialog-slide-description"
                    >
                        Are you sure? You can not recover this.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Stack
                        flexDirection={"row"}
                        gap={1}
                        justifyContent={"flex-end"}
                    >
                        <CusSecBtn
                            label="CANCEL"
                            action={handleClose}
                            color={"#BB0406"}
                        />
                        <CusPrimBtn
                            label="DELETE"
                            action={handleDelete}
                            type={"submit"}
                            color={"#BB0406"}
                            hover={"#CC1C00"}
                        />
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
}
