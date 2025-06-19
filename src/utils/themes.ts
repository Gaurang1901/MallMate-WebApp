import { createTheme, ThemeOptions } from "@mui/material/styles";

// Light theme configuration
const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#7c3aed", // Vibrant purple
      light: "#a78bfa",
      dark: "#5b21b6",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0d9488", // Teal
      light: "#2dd4bf",
      dark: "#0f766e",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#18181b",
      secondary: "#71717a",
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "primary",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#7c3aed",
          '&:hover': {
            backgroundColor: 'rgba(124, 58, 237, 0.08)',
          },
        },
      },
    },
  },
};

// Dark theme configuration
const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#a78bfa", // Lighter purple for better visibility
      light: "#c4b5fd",
      dark: "#7c3aed",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2dd4bf", // Lighter teal for better visibility
      light: "#5eead4",
      dark: "#0d9488",
      contrastText: "#ffffff",
    },
    background: {
      default: "#18181b", // Zinc 900
      paper: "#27272a", // Zinc 800
    },
    text: {
      primary: "#fafafa", // Zinc 50
      secondary: "#a1a1aa", // Zinc 400
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          backgroundImage: "none",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#a78bfa",
          '&:hover': {
            backgroundColor: 'rgba(167, 139, 250, 0.08)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#52525b #27272a",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#27272a",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#52525b",
            minHeight: 24,
            border: "2px solid #27272a",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#71717a",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#71717a",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#71717a",
          },
        },
      },
    },
  },
};

// Create theme instances
export const lightThemeInstance = createTheme(lightTheme);
export const darkThemeInstance = createTheme(darkTheme);

// Export theme options for use in ThemeProvider
export const getTheme = (mode: "light" | "dark") => {
  return mode === "light" ? lightThemeInstance : darkThemeInstance;
};
