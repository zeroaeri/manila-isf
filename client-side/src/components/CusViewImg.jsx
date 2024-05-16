import {
    Modal,
    Box,
    Typography,
    Divider,
    IconButton,
    Stack,
    Button,
    InputLabel,
} from "@mui/material";
import { CusSecBtn } from "./CusButton";
import { CloseRounded } from "@mui/icons-material";
import { useState } from "react";
const CusViewImg = ({ src, alt }) => {
    const [openImage, setOpenImage] = useState(false);
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        bgcolor: "background.paper",
        boxShadow: "0px 0px 2px rgba(76, 96, 133, 0.6)",
        p: 0.5,
        borderRadius: 3,
    };

    return (
        <>
            <Stack gap={0.5}>
                <InputLabel
                    sx={{
                        fontSize: 11,
                        fontWeight: "bold",
                        color: "#1C3055",
                    }}
                >
                    {"Location Image"}
                </InputLabel>
                <CusSecBtn label={"View"} action={() => setOpenImage(true)} />
            </Stack>

            <Modal open={openImage} onClose={() => setOpenImage(false)}>
                <Box sx={style}>
                    <Stack flex={"flex"} flexDirection={"column"}>
                        <IconButton
                            onClick={() => setOpenImage(false)}
                            sx={{
                                alignSelf: "flex-end",
                                position: "absolute",
                            }}
                        >
                            <CloseRounded
                                sx={{ color: "#4C6085", fontSize: 16 }}
                            />
                        </IconButton>
                        <img
                            src={src}
                            alt={alt}
                            style={{ borderRadius: 9, objectFit: "cover" }}
                            width={900}
                            height={600}
                        />
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default CusViewImg;
