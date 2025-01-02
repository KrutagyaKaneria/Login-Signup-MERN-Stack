import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { handleError, handleSuccess } from '../utils';

function Signup() {
  const [signupInfo, setsignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }
    try {
      const url = 'https://loginsignupmernstackapi.vercel.app/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200 p-4">
      <div className="absolute inset-0 opacity-20 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?healthcare,hospital')" }}></div>
      <div className="relative w-full max-w-md bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-orange-700 mb-8">
          Create Your Account
        </h1>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-300"
              value={signupInfo.name}
            />
          </div>
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
              value={signupInfo.email}
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
              value={signupInfo.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
