// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import { LoginForm } from "../../shared/forms/LoginForm";
import { motion } from "framer-motion";
import bg from "../../assets/Login-bg1.png";
import icon from "../../assets/MallMate-Icon-Transperant.png";

const MotionDiv = motion.div;

const LoginPage = () => {
  return (
    <div
        className="fixed inset-0 w-full h-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: ` url(${bg})`,
        backgroundAttachment: "fixed",
        width: "100vw",
        margin: 0,
        padding: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "fixed",
      }}
    >
      <div className="w-full h-full overflow-y-auto bg-black/50">
        <div className="min-h-screen flex items-center justify-center p-4">
          <MotionDiv
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-md border border-white/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <MotionDiv
              className="flex flex-col items-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.img
                src={icon}
                alt="MallMate"
                className="w-24 h-24 mb-4"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.h4
                className="text-white text-xl font-semibold text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Welcome to MallMate
              </motion.h4>
              <motion.p
                className="text-white/80 text-sm text-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Your one-stop destination for shopping
              </motion.p>
            </MotionDiv>
            <LoginForm />
            <MotionDiv
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-white text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-300 hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </p>
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
