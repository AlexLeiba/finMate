import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "var(--primary)",
  //   },
  //   text: {
  //     primary: "var(--text)",
  //     secondary: "var(--text-muted)",
  //   },
  // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },

      variants: [
        {
          props: {
            variant: "contained",
            color: "primary",
          },
          style: {
            color: "var(--text)",
            backgroundColor: "var(--primary)",

            "&:hover": {
              backgroundColor: "var(--primary-hover)",
            },
          },
        },
        {
          props: {
            variant: "outlined",
            color: "primary",
          },
          style: {
            color: "var(--text)",
            border: "1px solid var(--primary)",

            "&:hover": {
              borderColor: "var(--primary-hover)",
            },
          },
        },
      ],
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "var(--text)",

          "&.Mui-focused": {
            color: "var(--text)",
          },

          // "&.Mui-error": {
          //   color: "var(--error)",
          // },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "var(--text)",
          backgroundColor: "var(--primary)",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary)",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary)",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary)",
          },

          "&.Mui-disabled": {
            backgroundColor: "var(    --primary-disabled)",
            color: "var(--text-muted)",
          },
        },

        input: {
          color: "var(--text)",

          "&::placeholder": {
            color: "var(--text)",
            opacity: 1,
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "var(--text)",

          // "&.Mui-error": {
          //   color: "var(--error)",
          // },
        },
      },
    },
  },
});
