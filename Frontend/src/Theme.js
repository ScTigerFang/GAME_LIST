import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
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
