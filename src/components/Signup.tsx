import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/users/signup", {
        username,
        email,
        password,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setRePassword("");
      // Redirect to login page after successful signup
      alert("Signup successful! Please login.");
      toast.success("Signup successful!", {
        style: {
          border: "1px solid #ffffff",
          padding: "16px",
          color: "#000000",
        },
        iconTheme: {
          primary: "#e1434b",
          secondary: "#ffffff",
        },
      });
      navigate("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true}/>
      <div className="w-full min-h-[480px] py-4 text-black/75 rounded-lg border border-[#0000000f] flex flex-col items-center justify-start">
        <h1 className="text-[#e1434b] text-4xl mb-4"> <b>Signup</b> </h1>

        {/* --------------------------- Username --------------------------- */}
        <label htmlFor="username" className="w-[84%] flex flex-col items-start justify-center text-lg py-3">
          <span className="w-full">Username</span>
          <input
            type="text"
            id="username"
            className="w-full h-full rounded-sm p-2 bg-[#ffffff40]"
            placeholder="Enter Your Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>

        {/* --------------------------- Email --------------------------- */}
        <label htmlFor="email" className="w-[84%] flex flex-col items-start justify-center text-lg py-3">
          <span className="w-full">Email</span>
          <input
            type="email"
            id="email"
            className="w-full h-full rounded-sm p-2 bg-[#ffffff40]"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        {/* -------------------------- Password -------------------------- */}
        <label htmlFor="pass" className="w-[84%] flex flex-col items-start justify-center text-lg py-3 relative">
          <span className="w-full">Password</span>
          <input
            type={showPassword ? "text" : "password"}
            id="pass"
            className="w-full h-full rounded-sm p-2 bg-[#ffffff40] pr-10"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="button"
            className="absolute right-3 top-[55%] bg-transparent border-none cursor-pointer"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={22} height={22}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.64 11.64 0 012.99-4.36m2.12-1.7A9.97 9.97 0 0112 5c5 0 9.27 3.11 11 7.5a11.64 11.64 0 01-4.21 5.09M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={22} height={22}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </label>

        {/* ------------------------ Re Enter Pass ------------------------ */}
        <label htmlFor="rePass" className="w-[84%] flex flex-col items-start justify-center text-lg py-3 relative">
          <span className="w-full">Re-Enter Password</span>
          <input
            type={showRePassword ? "text" : "password"}
            id="rePass"
            className="w-full h-full rounded-sm p-2 bg-[#ffffff40] pr-10"
            placeholder="Re-Enter Password"
            onChange={(e) => setRePassword(e.target.value)}
            value={rePassword}
          />
          <button
            type="button"
            className="absolute right-3 top-[55%] bg-transparent border-none cursor-pointer"
            tabIndex={-1}
            onClick={() => setShowRePassword((prev) => !prev)}
            aria-label={showRePassword ? "Hide password" : "Show password"}
          >
            {showRePassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={22} height={22}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.64 11.64 0 012.99-4.36m2.12-1.7A9.97 9.97 0 0112 5c5 0 9.27 3.11 11 7.5a11.64 11.64 0 01-4.21 5.09M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={22} height={22}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </label>

        {/* -------------------------- Error Message -------------------------- */}
        {error && <span className="text-red-500 text-sm w-full text-center">{error}</span>}

        <button
          onClick={handleSignup}
          className="w-[84%] h-[44px] bg-[#e1434b] transition-shadow duration-300 hover:border-black hover:shadow-[6px_6px_0px_1px_#00000040] text-white rounded-sm p-2 mt-8"
        >
          Signup
        </button>
        <span className="text-sm mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#e1434b] border border-transparent hover:border-b-[#e1434b]">
            Login
          </a>
        </span>
      </div>
    </>
  );
}

export default Signup;
