import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./utils/themes";
import { useState, useEffect } from "react";
import { NotificationProvider } from "./context/NotificationContext";
import { Header } from "./shared/components/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import Home from "./pages/Home/Home";
import { checkAuth } from "./store/auth.slice";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => state.auth.isLoggedIn);
  console.log(selector);
  
  useEffect(() => {
    // Check authentication status on app load
    dispatch(checkAuth());
  }, [dispatch]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <NotificationProvider>
        <Router>
          <Header
            onThemeToggle={toggleTheme}
            currentMode={mode}
          />
          <Routes>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
