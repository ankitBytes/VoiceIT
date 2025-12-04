import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

let theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Nunito Sans, sans-serif",
      textTransform: "none",
    },
  },
});

theme = responsiveFontSizes(theme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </StrictMode>
)
