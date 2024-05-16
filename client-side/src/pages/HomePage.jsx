import { Navigate } from "react-router-dom";
import { useData } from "../DataContext";
import { Grid, Box, Typography } from "@mui/material";
import {
    PlaceOutlined,
    PeopleOutline,
    HomeWorkOutlined,
} from "@mui/icons-material";
import isfsImg from "../assets/images/isfs.jpg";
import awrImg from "../assets/images/awardees.jpg";
const HomePage = () => {
    const { token, users, districts, estates, isfs, awardees, curUserRole } =
        useData();

    if (token == null) {
        return <Navigate to={"/login"} />;
    }

    const countPerDistrict = districts.reduce((acc, districtObj) => {
        const districtName = districtObj.name;
        const count = isfs.filter(
            (isf) => isf.district === districtName
        ).length;
        acc[districtName] = count;
        return acc;
    }, {});

    const countPerEstate = estates.reduce((acc, estate) => {
        const estateName = estate.name;
        const count = awardees.filter(
            (awr) => awr.estate === estateName
        ).length;
        acc[estateName] = count;
        return acc;
    }, {});

    const items = [
        {
            name: "Users",
            quan: users.length,
            icon: <PeopleOutline sx={{ fontSize: 75 }} />,
            color: "#4C6085",
        },
        {
            name: "Districts",
            quan: districts.length,
            icon: <PlaceOutlined sx={{ fontSize: 75 }} />,
            color: "#D7B73F",
        },
        {
            name: "Estates",
            quan: estates.length,
            icon: <HomeWorkOutlined sx={{ fontSize: 75 }} />,
            color: "#7CA081",
        },
    ];

    return (
        <Box gap={2} display={"flex"} flexDirection={"column"}>
            {["Super Admin"].includes(curUserRole) && (
                <Grid
                    container
                    padding={2}
                    columns={{ xs: 2, sm: 2, md: 12 }}
                    columnSpacing={3}
                    color={"#FFF"}
                    gap={{ xs: 1, md: 0 }}
                >
                    {items.map((item, key) => (
                        <Grid item xs={2} sm={4} key={key}>
                            <Box
                                bgcolor={item.color}
                                px={5}
                                py={3}
                                borderRadius={2}
                                display={"flex"}
                                flexDirection={"row"}
                                gap={2}
                                width={"100%"}
                                alignItems={"center"}
                                boxShadow={4}
                            >
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"flex-start"}
                                    width={"70%"}
                                >
                                    <Typography
                                        fontSize={48}
                                        fontWeight={"bold"}
                                        marginBottom={-1}
                                    >
                                        {item.quan}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: 24,
                                            fontWeight: "medium",
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                </Box>
                                <Box alignItems={"flex-end"} width={"30%"}>
                                    {item.icon}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {["Super Admin", "Admin", "ISF Admin", "Estate Admin"].includes(
                curUserRole
            ) && (
                <Box display={"flex"} flexDirection={"row"} width={"100%"}>
                    {["Super Admin", "Admin", "ISF Admin"].includes(
                        curUserRole
                    ) && (
                        <Box
                            bgcolor={"#3F6B45"}
                            mx={2}
                            padding={2}
                            borderRadius={2}
                            width={"50%"}
                            boxShadow={4}
                        >
                            <img
                                src={isfsImg}
                                alt="ISF Image"
                                width={"100%"}
                                height={210}
                                style={{
                                    objectFit: "cover",
                                    borderRadius: 5,
                                }}
                            />
                            <Grid
                                container
                                columns={{ xs: 6, sm: 12 }}
                                columnSpacing={3}
                                rowGap={2}
                            >
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            fontSize: 24,
                                            fontWeight: "medium",
                                            color: "#D7B73F",
                                        }}
                                    >
                                        Informal Settlers Family (ISFs)
                                    </Typography>
                                </Grid>

                                {Object.keys(countPerDistrict).map(
                                    (dst, key) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={2}
                                            key={key}
                                        >
                                            <Box
                                                bgcolor={"#FFF"}
                                                p={2}
                                                borderRadius={2}
                                                display={"flex"}
                                                flexDirection={"row"}
                                                width={"100%"}
                                                alignItems={"center"}
                                                boxShadow={4}
                                                justifyContent={"space-between"}
                                            >
                                                <Typography>
                                                    District {dst}
                                                </Typography>
                                                <Typography>
                                                    {countPerDistrict[dst]}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </Box>
                    )}

                    {["Super Admin", "Admin", "Estate Admin"].includes(
                        curUserRole
                    ) && (
                        <Box
                            bgcolor={"#1C3055"}
                            mx={2}
                            padding={2}
                            borderRadius={2}
                            width={"50%"}
                            boxShadow={4}
                        >
                            <img
                                src={awrImg}
                                alt="Estate Image"
                                width={"100%"}
                                height={210}
                                style={{ objectFit: "cover", borderRadius: 5 }}
                            />
                            <Grid
                                container
                                columns={{ xs: 6, sm: 12 }}
                                columnSpacing={3}
                                rowGap={2}
                            >
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            fontSize: 24,
                                            fontWeight: "medium",
                                            color: "#D7B73F",
                                        }}
                                    >
                                        Estate Awardees
                                    </Typography>
                                </Grid>

                                {Object.keys(countPerEstate).map((est, key) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={2}
                                        key={key}
                                    >
                                        <Box
                                            bgcolor={"#FFF"}
                                            p={2}
                                            borderRadius={2}
                                            display={"flex"}
                                            flexDirection={"row"}
                                            width={"100%"}
                                            alignItems={"center"}
                                            boxShadow={4}
                                            justifyContent={"space-between"}
                                        >
                                            <Typography>{est}</Typography>
                                            <Typography>
                                                {countPerEstate[est]}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default HomePage;
