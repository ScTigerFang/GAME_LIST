import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            @keyframes flame-flicker {
                0%, 100% {
                    text-shadow:
                        0 0 3px #FFD54F,
                        0 0 5px #FFB300,
                        0 0 10px #FF8F00,
                        0 0 15px #FF6F00,
                        0 0 20px #E65100;
                }
                50% {
                    text-shadow:
                        0 0 4px #FFD54F,
                        0 0 6px #FFB300,
                        0 0 11px #FF8F00,
                        0 0 16px #FF6F00,
                        0 0 21px #E65100;
                }
            }
        `,
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#333",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
