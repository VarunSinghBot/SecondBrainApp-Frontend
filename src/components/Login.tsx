import { useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  // const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handelLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/login', {
        email,
        password
      });
      const { token, username } = response.data;
      console.log(response.data);

      // Save token to local storage
      localStorage.setItem('token', token);
      // Save user to local storage
      localStorage.setItem('username', JSON.stringify(username));
      // Save token and user to Redux store
      dispatch(setAuth({ token, username }));
      setSuccess(true);
      navigate("/main")
    } catch (error) {
      setError('Invalid email or password');
    }
  }

  return (
    <>
      <section className="w-full h-full flex items-center justify-center">
        <div className='w-[440px] h-[480px] text-white rounded-lg bg-[#ffffff0f] border border-[#ffffff40] flex flex-col items-center justify-center'>
            <h1 className="text-white text-4xl mb-4"> Login </h1>

            {/* --------------------------- Email --------------------------- */}
            <label htmlFor="email" className="w-[84%] flex flex-col items-start justify-center text-lg">
                <span className="w-full">Email</span>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full h-full rounded-sm p-2 bg-[#ffffff40]" 
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
            </label>

            {/* -------------------------- Password -------------------------- */}
            <label htmlFor="pass" className="w-[84%] flex flex-col items-start justify-center text-lg py-4">
                <span className="w-full">Password</span>
                <input 
                  type="password" 
                  id="pass" 
                  className="w-full h-full rounded-sm p-2 bg-[#ffffff40]" 
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
            </label>

            {/* -------------------------- Error Message -------------------------- */}
            {error && <span className="text-red-500 text-sm w-full text-center">{error}</span>}

            {/* -------------------------- Success Message -------------------------- */} 
            {success && <span className="text-green-500 text-sm w-full text-center">Login successful!</span>}

            {/* -------------------------- Loading Spinner -------------------------- */}
            <button 
              className="w-[84%] h-[44px] bg-[#ffffff] text-black rounded-sm p-2 mt-8"
              onClick={(e) => {
              // Handle Login action
              handelLogin(e);
            }}
            >Login</button>

            <span className="text-sm mt-4">Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></span>
        </div>
      </section>
    </>
  )
}

export default Login
