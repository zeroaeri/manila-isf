import { Box, Typography, Stack } from "@mui/material";
const Header = ({ module, number, location, log }) => {
    return (
        <Box
            display={"flex"}
            bgcolor={"#1C3055"}
            sx={{ borderRadius: 3 }}
            height={"25%"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={5}
        >
            {log ? (
                <>
                    <Typography variant="h4" color="#fff" fontWeight={"bolder"}>
                        {module}
                    </Typography>
                </>
            ) : (
                <>
                    <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        width="100%	"
                    >
                        <Stack flexDirection={"column"} textAlign={"left"}>
                            <Typography
                                variant="h4"
                                color="#fff"
                                fontWeight={"bolder"}
                            >
                                {module}
                            </Typography>
                            <Typography variant="h5" color="#fff">
                                {location}
                                Registration
                            </Typography>
                        </Stack>
                        <Typography
                            variant="h2"
                            color="#fff"
                            fontWeight={"bolder"}
                        >
                            {number.toString().length == 1
                                ? `0${number}`
                                : number}
                        </Typography>
                    </Stack>
                </>
            )}
        </Box>
    );
};

export default Header;
