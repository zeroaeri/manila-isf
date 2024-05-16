import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import RoutesNav from "./RoutesNav";
import { DataProvider } from "./DataContext";

function App() {
    const theme = createTheme({
        palette: { mode: "light" },
        typography: {
            fontFamily: ["Space Grotesk", "sans-serif"].join(","),
            color: "#1C3055",
        },
        components: {
            MuiFormLabel: {
                styleOverrides: {
                    asterisk: { color: "#BB0406", fontWeight: "normal" },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        borderRadius: "6px",
                        "& fieldset.MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(28, 48, 85, 0.3)",
                        },
                    },
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    root: {
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "black",
                            borderWidth: "1px",
                        },
                    },
                    input: {
                        fontSize: 12,
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <DataProvider>
                <RoutesNav />
            </DataProvider>
        </ThemeProvider>
    );
}

export default App;
