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
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Account from "./pages/Account/Account";
import ProductView from "./pages/ProductView/ProductView";
import ShopAll from "./pages/categories/ShopAll";
import CategoryPage from "./pages/categories/CategoryPage";
import FAQ from "./pages/FAQ";
import { LoaderProvider } from "./context/LoaderContext";
import CartPage from './pages/CartPage';

function App() {
  const getInitialMode = () => {
    const stored = sessionStorage.getItem('themeMode');
    if (stored === 'light' || stored === 'dark') return stored;
    sessionStorage.setItem('themeMode', 'dark');
    return 'dark';
  };
  const [mode, setMode] = useState<"light" | "dark">(getInitialMode());
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    // Check authentication status on app load
    dispatch(checkAuth());
  }, [dispatch]);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      sessionStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <LoaderProvider>
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
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/account" element={isLoggedIn ? <Account /> : <LoginPage />} />
              <Route path="/product/:id" element={<ProductView />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shop" element={<ShopAll />} />
              <Route path="/category/:categoryId" element={<CategoryPage categoryId="1" categoryName="Electronics" />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}

export default App;
