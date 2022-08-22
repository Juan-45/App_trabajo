import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        //blue
        primary: {
            main: "#0089ff",
            light: "#4faeff",
            ultraLight: "#4faeff47",
            dark: "#0062b5",
            highligth: "#c6e4ff",
        },
        //gray
        secondary: {
            main: "#636363",
            mainMedium: "#cccccc",
            dark: "#3c3c3c",
            light: "#e2e2e25c",
            hover: "#c4c4c4",
        },
        //green
        /* ternary: {
             main: "#6db733",
             light: "#c0d0b3",
         },*/

        black: {
            main: "#000000",
        },

        text: {
            primary: "#000000",
            secondary: "#444444",
        },
        //darker grey
        background: {
            dark: "#2d2d2d",
            default: "#747474",
            defaultTraslucid: "#747474e6",
            light: "#d0d0d0",
        },
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 550, //previous value 800
            md: 960, //smartphonePortrait
            lg: 1366,
            xl: 1920, //desktop
        },
    },

    typography: {
        fontFamily: ["Helvetica"],
        fontSize: 12,
    },
});

theme.palette = {
    ...theme.palette,
    error: {
        ...theme.palette.error,
        traslucid: "#ef535045", //RGBA => A= 0.27
    },
    success: {
        ...theme.palette.success,
        traslucid: "#2e7d3245",
    },
};

//Name of the component (MuiTypography)
//Name of the slot (root, h1, h2, etc)
theme.components = {
    MuiTextField: {
        defaultProps: {
            variant: "filled",
            size: "small",
            fullWidth: true,
        },
        styleOverrides: {
            root: { marginBottom: "20px" },
        },
    },

    MuiFormControl: {
        styleOverrides: {
            root: { width: "100%" },
        },
    },

    MuiFormGroup: {
        styleOverrides: {
            root: { marginBottom: "15px" },
        },
    },

    MuiButton: {
        defaultProps: {
            size: "small",
        },
        styleOverrides: {
            root: {
                minWidth: "unset",
                boxShadow: theme.shadows[1],
                "&:hover": {
                    boxShadow: "unset",
                },
            },
            outlined: {
                boxShadow: "unset",
            },
            containedSizeSmall: {
                letterSpacing: "0px",
            },
        },
    },

    MuiMenu: {
        styleOverrides: {
            root: {
                "& .MuiMenu-paper": {
                    borderRadius: "0",
                },
            },
        },
    },

    MuiIconButton: {
        variants: [
            {
                props: { variant: "mobile" },
                style: {
                    color: "white",
                    background: theme.palette.primary.main,
                    boxShadow: theme.shadows[4],
                    "&:hover": {
                        background: theme.palette.primary.dark,
                    },
                },
            },
        ],
    },

    MuiFilledInput: {
        styleOverrides: {
            root: {
                "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "1px solid black",
                },
                "& .MuiFilledInput-input": {
                    paddingTop: "17px",
                },
                "&.MuiInputBase-multiline": {
                    paddingTop: "17px",
                    "& .MuiInputBase-inputMultiline": {
                        paddingTop: "0px",
                    },
                },
            },
        },
    },

    MuiInputLabel: {
        styleOverrides: {
            root: {
                "&.MuiInputLabel-shrink": {
                    transform: "translate(12px, 4px) scale(0.75)",
                },
            },
        },
    },

    MuiAutocomplete: {
        defaultProps: {
            size: "small",
            disablePortal: true,
        },
        styleOverrides: {
            root: {
                width: "100%",
                "& .MuiAutocomplete-inputRoot": {
                    padding: "17px 12px 4px !important",
                },
                "& .MuiInputBase-inputSizeSmall": {
                    padding: "0px !important",
                },
            },
        },
    },

    MuiTooltip: {
        defaultProps: {
            arrow: true,
        },
    },

    MuiTableCell: {
        styleOverrides: {
            root: {
                whiteSpace: "nowrap"
            },
        },
    }
};

export default theme;