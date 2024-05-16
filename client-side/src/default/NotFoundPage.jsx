import notfound from "../assets/images/404.png";
import { Box, Stack, Typography } from "@mui/material";
import { ArrowLeftOutlined } from "@mui/icons-material";
import { CusIconBtn } from "../components";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <Box
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100vh"}
            p={10}
        >
            <Stack
                display="flex"
                flexDirection="row"
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={4}
            >
                <img src={notfound} alt="404 Image" width={"50%"} />
                <Stack
                    display={"flex"}
                    flexDirection={"column"}
                    gap={1}
                    textAlign={"left"}
                    width={"50%"}
                >
                    <Typography
                        variant="h3"
                        color="#D35A5E"
                        fontWeight={"bolder"}
                    >
                        Oops!
                    </Typography>
                    <Typography
                        variant="h5"
                        color="#4C6085"
                        fontWeight={"bolder"}
                        mb={5}
                    >
                        We couldn't find the page you were looking for.
                    </Typography>
                    <CusIconBtn
                        icon={<ArrowLeftOutlined />}
                        text={"Go to Homepage"}
                        type="button"
                        w={200}
                        color={"#4C6085"}
                        hover={"#3C4D6C"}
                        action={() => navigate('/')}
                    />
                </Stack>
            </Stack>
        </Box>
    );
};

export default NotFoundPage;
