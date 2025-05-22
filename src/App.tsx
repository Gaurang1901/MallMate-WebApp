import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./utils/themes";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  return (
    <ThemeProvider theme={getTheme(mode)}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
