import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import '../index.css';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 p-4 relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?hospital,healthcare')",
        }}
      ></div>

      <div className="relative text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-orange-700 mb-6 drop-shadow-md">
          Welcome, {loggedInUser}!
        </h1>
        <button
          onClick={handleLogout}
          className="px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300"
        >
          Logout
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
