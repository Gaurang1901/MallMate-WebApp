import LoginPage from "./pages/auth/LoginPage";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./utils/themes";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  return (
    <ThemeProvider theme={getTheme(mode)}>
      <LoginPage />
    </ThemeProvider>
  );
}

export default App;
