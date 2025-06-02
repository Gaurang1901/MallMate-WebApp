import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./utils/themes";
import { useState } from "react";
import { NotificationProvider } from "./context/NotificationContext";
import { Header } from "./shared/components/Header";
import HomePage from "./pages/Home/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const selector = useSelector((state: RootState) => state.auth.user);
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <NotificationProvider>
        <Router>
          <Header
            onThemeToggle={toggleTheme}
            isLoggedIn={selector ? true : false}
            currentMode={mode}
          />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
