import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Check if passwords match
    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make a POST request to the backend
      const response = await axios.post("http://localhost:5000/api/v1/users/signup", {
        username,
        email,
        password,
      });
      console.log(response.data)
      // If successful, show success message
      setSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setRePassword("");

      if (response.status === 201) {
        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

    } catch (err: any) {
      // Handle errors from the backend
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      <section className="w-full h-full flex items-center justify-center">
        <div className="w-[440px] min-h-[480px] py-4 text-white rounded-lg bg-[#ffffff0f] border border-[#ffffff40] flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl mb-4"> Signup </h1>

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
          <label htmlFor="pass" className="w-[84%] flex flex-col items-start justify-center text-lg py-3">
            <span className="w-full">Password</span>
            <input
              type="password"
              id="pass"
              className="w-full h-full rounded-sm p-2 bg-[#ffffff40]"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          {/* ------------------------ Re Enter Pass ------------------------ */}
          <label htmlFor="rePass" className="w-[84%] flex flex-col items-start justify-center text-lg py-3">
            <span className="w-full">Re-Enter Password</span>
            <input
              type="password"
              id="rePass"
              className="w-full h-full rounded-sm p-2 bg-[#ffffff40]"
              placeholder="Re-Enter Password"
              onChange={(e) => setRePassword(e.target.value)}
              value={rePassword}
            />
          </label>

          {/* -------------------------- Error Message -------------------------- */}
          {error && <span className="text-red-500 text-sm w-full text-center">{error}</span>}

          {/* -------------------------- Success Message -------------------------- */}
          {success && <span className="text-green-500 text-sm w-full text-center">Signup successful!</span>}

          <button
            onClick={handleSignup}
            className="w-[84%] h-[44px] bg-[#ffffff] hover:bg-[#fffffff0] text-black rounded-sm p-2 mt-8"
          >
            Signup
          </button>
          <span className="text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 border border-transparent hover:border-b-blue-400">
              Login
            </a>
          </span>
        </div>
      </section>
    </>
  );
}

export default Signup;
