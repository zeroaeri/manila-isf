import {
    Modal,
    Box,
    Typography,
    Divider,
    IconButton,
    Stack,
} from "@mui/material";
import { CusPrimBtn, CusSecBtn } from "./CusButton";
import { CloseRounded } from "@mui/icons-material";
import moment from "moment";
const CusModal = ({
    label,
    open,
    setOpen,
    addFormLayout,
    form,
    action,
    method,
    updated,
}) => {
    const handleClose = () => {
        setOpen(false);
        form.resetForm();
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        bgcolor: "background.paper",
        boxShadow: "0px 0px 2px rgba(76, 96, 133, 0.6)",
        p: 4,
        borderRadius: 3,
    };

    return (
        <>
            <Modal
                keepMounted
                open={open}
                onClose={action}
                aria-labelledby="title"
                aria-describedby="description"
                style={{ overflow: "scroll", height: "100%" }}
            >
                <form onSubmit={form.handleSubmit}>
                    <Stack sx={style} gap={2}>
                        <Box
                            display="flex"
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Stack flexDirection={"column"}>
                                <Typography
                                    id="title"
                                    fontSize={16}
                                    fontWeight={"medium"}
                                    gutterBottom
                                    color={'#000'}
                                >
                                    {label}
                                </Typography>
                            </Stack>

                            <IconButton onClick={action}>
                                <CloseRounded
                                    sx={{ color: "#4C6085", fontSize: 16 }}
                                />
                            </IconButton>
                        </Box>
                        <Divider />

                        {addFormLayout}
                        <Stack
                            flexDirection={{
                                xs: "column",
                                sm: "row",
                                lg: "row",
                            }}
                            gap={1}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Stack
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Typography fontSize={11} color={"#ABABAB"}>
                                    {method == "VIEW" && (
                                        <>
                                            {updated != ""
                                                ? `Last Updated: ${moment(
                                                      updated
                                                  ).format("LLLL")}`
                                                : ""}
                                        </>
                                    )}
                                </Typography>
                            </Stack>

                            <Stack
                                flexDirection={"row"}
                                gap={1}
                                justifyContent={"flex-end"}
                            >
                                <CusSecBtn
                                    label={method == "VIEW" ? "Done" : "Cancel"}
                                    action={handleClose}
                                />

                                {method !== "VIEW" && (
                                    <CusPrimBtn
                                        label={method}
                                        type={"submit"}
                                    />
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </form>
            </Modal>
        </>
    );
};

export default CusModal;
