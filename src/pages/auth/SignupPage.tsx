import { Link } from "react-router-dom";
import { SignupForm } from "../../components/forms/SignupForm";

const SignupPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/assets/login-bg-1.jpg')",
      }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 w-max md:w-full max-w-md border border-white/30">
        <div className="flex flex-col items-center mb-6">
          <img src="/src/assets/MallMate-Icon-Transperant.png" alt="MallMate" className="w-30 h-30" />
          <h4 className="text-primary/70 text-lg">Create your account</h4>
        </div>
        <SignupForm />
        <div className="text-center mt-4">
          <p className="text-primary text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-blue-200 hover:text-blue-400"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 