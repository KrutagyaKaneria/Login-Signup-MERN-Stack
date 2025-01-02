import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }
    try {
      const url = 'https://loginsignupmernstackapi.vercel.app/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200 p-4">
      <div className="absolute inset-0 opacity-20 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?login,user')" }}></div>
      <div className="relative w-full max-w-md bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-orange-700 mb-8">
          Welcome Back
        </h1>
        <form className="space-y-6" onSubmit={handlelogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-300"
              value={loginInfo.email}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-300"
              value={loginInfo.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-orange-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
