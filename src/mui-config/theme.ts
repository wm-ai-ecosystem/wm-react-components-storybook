import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: 1,
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "rgba(0, 0, 0, 1) !important",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&.Mui-disabled": {
            WebkitTextFillColor: "var(--wm-form-control-color-place-holder)",
          },
          "::placeholder": {
            opacity: "1",
          },
          "::-webkit-input-placeholder": {
            opacity: "1",
          },
          "::-moz-placeholder": {
            opacity: "1",
          },
          ":-ms-input-placeholder": {
            opacity: "1",
          },
          "::-ms-input-placeholder": {
            opacity: "1",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          transform: "none",
          transition: "none",
          animation: "none",
          overflow: "visible",
          "& .MuiPaper-root": {
            transform: "none",
            transition: "none",
            animation: "none",
            overflow: "visible",
          },
        },
      },
    },

    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiDialog-container": {
            width: "inherit",
          },
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
          },
          "& .MuiDialogContent-root": {
            padding: 0,
          },

          MuiDialogContent: {
            Padding: 0,
          },
          "&.model-sheet": {
            "& .MuiDialog-paper": {
              margin: "0 !important",
              padding: "0 !important",
              borderRadius: "0 !important",
            },
          },
        },
        paper: {
          width: "var(--wm-modal-width)",
        },
      },
    },

    // inputs
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            "& .MuiInputBase-root": {
              border: "1px solid #ee5f5b",
            },
          },
          width: "100%",
        },
      },
      defaultProps: {
        variant: "standard",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            "& input": {
              border: "1px solid #ee5f5b",
              borderColor: "#ee5f5b",
            },
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          width: "100%",
          margin: "inherit",
          padding: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
          color: "inherit",
          textAlign: "inherit",
          fontFamily: "inherit",
          letterSpacing: "inherit",
          wordSpacing: "inherit",
          textDecoration: "inherit",
          textTransform: "inherit",
          borderColor: "inherit",
          borderBottom: "none",
          transition: "none",
          border: "none",
          "&:before": {
            content: "none", //  remove default underline
            border: "none",
          },
          "&:after": {
            content: "none", // Prevent focus animation
            border: "none",
          },
          "&:hover:not(.Mui-disabled):before": {
            content: "none", //  Prevent hover animation
            border: "none",
          },
          "&.Mui-error": {
            "& input": {
              // Target the input element directly
              // border: "1px solid #ee5f5b",
              borderColor: "#ee5f5b",
            },
          },
          "&:invalid": {
            border: "inherit",
            borderColor: "inherit",
          },
          "&:required:invalid": {
            border: "inherit",
            borderColor: "inherit",
          },
          "&:focus": {
            border: "inherit",
          },
          "$:disabled": {
            border: "inherit",
            backgroundColor: "inherit",
            color: "none",
          },
          "&:required": {
            border: "inherit",
          },
        },
        input: {
          padding: "inherit",
          margin: "inherit",
          height: "inherit",
          fontSize: "inherit",
          boxSizing: "inherit",
          color: "inherit",
          width: "100%",
          // Fix disabled input text opacity
          "&.Mui-disabled": {
            WebkitTextFillColor: "currentColor !important",
            opacity: "1 !important",
          },
          "&.Mui-disabled::placeholder": {
            WebkitTextFillColor: "currentColor !important",
            opacity: "1 !important",
          },
        },
        multiline: {
          "&.Mui-error": {
            "& input": {
              // Target the input element directly
              border: "1px solid #ee5f5b",
              borderColor: "#ee5f5b",
              width: "100%",
            },
          },
        },
      },
    },

    MuiRating: {
      styleOverrides: {
        root: {
          color: "none",
          margin: "none",
          height: "none",
          borderRadius: "none",
          border: "none",
          width: "none",
          fontSize: "none",
          padding: "none",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
            borderRadius: "none",
            border: "none",
          },
        },
        label: {
          color: "none",
          fontSize: "none",
          "&:hover": {
            backgroundColor: "transparent",
            borderRadius: "none",
          },
          "&:active": {
            backgroundColor: "transparent",
            borderRadius: "none",
          },
          "&:focus": {
            backgroundColor: "transparent",
            borderRadius: "none",
          },
        },
        icon: {
          color: "inherit",
          margin: "none",
          height: "none",
          borderRadius: "none",
          border: "none",
          width: "none",
        },

        iconFilled: {
          color: "inherit",
        },
        iconHover: {
          color: "inherit",
        },
      },
    },

    // Disable styles for all MUI components
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: 0,
          maxWidth: "none",
          display: "block",
          boxSizing: "border-box",
          position: "relative",
          backgroundColor: "transparent",
        },
      },
      // You can also add default props
      defaultProps: {
        disableGutters: true,
        maxWidth: false,
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: 0,
          fontSize: "inherit",
          lineHeight: "inherit",
          color: "inherit",
          textAlign: "inherit",
          fontFamily: "inherit",
          letterSpacing: "inherit",
          wordSpacing: "inherit",
          textDecoration: "inherit",
          textTransform: "inherit",
          whiteSpace: "inherit",
          fontWeight: "inherit",
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "inherit",
          "&:hover": {
            textDecoration: "none",
          },
          padding: "inherit",
          margin: "inherit",
          justifyContent: "inherit",
          alignItems: "inherit",
          cursor: "pointer",
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          padding: 0,
          margin: 0,
        },
      },
    },

    MuiIcon: {
      styleOverrides: {
        root: {
          margin: "0",
          padding: "0",
          fontSize: "inherit",
          width: "auto",
          height: "auto",
          color: "currentColor",
          verticalAlign: "middle",
          display: "inline-block",
          transition: "none",
          position: "static",
          top: "unset",
          left: "unset",
          background: "transparent",
          border: "none",
          borderRadius: "0",
          "&:hover": {
            background: "transparent",
            boxShadow: "none",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
        } as const,
      },
    },

    // Disable Paper elevation
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
  // Optional: Reset typography styles
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
