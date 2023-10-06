import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIN, setLoggedIN] = useState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: email,
        password: password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoggedIN(true);
      window.location.reload();

    } catch (err) {
      console.log('Invalid credentials');
    }
  };

  const handleGoogleLoginSuccess = (googleUser) => {
    const accessToken = googleUser.access_token;
    localStorage.setItem('token', accessToken);
    window.location.reload();
  };

  return (
    <>
    <div className="flex-col bg-background h-screen text-lightblueText px-4 font-master">
      <div className='flex items-center justify-center pt-12 text-2xl font-bold'>
        <h2>Login to View NASA APOD</h2>
      </div>
        <form>
          <div className='flex items-center justify-center pt-4 font-semibold'>
            <p>Your Email</p>
          </div>
          <div className='flex items-center justify-center text-background text-sm'>
            <input
            className='rounded border-lightblueText px-4 py-1 focus:outline-none focus:border-4'
            type="text"
            value={email}
            onChange={handleEmailChange} />
          </div>
          <div className='flex items-center justify-center pt-4 font-semibold'>
            <p>Your Password</p>
          </div>
          <div className='flex items-center justify-center text-background text-sm'>
            <input
            className='rounded border-lightblueText px-4 py-1 focus:outline-none focus:border-4'
            type="password"
            value={password}
            onChange={handlePasswordChange} />
          </div>
          <div className='flex items-center justify-center pt-4'>
            <button
            className='bg-lightblueText text-background rounded px-2 py-2 hover:bg-white'
            type="button"
            onClick={handleLogin}>Login</button>
          </div>
        </form>
          <div className='flex items-center justify-center pt-6'>
            <button
            className='bg-background text-lightblueText rounded px-2 py-2 hover:bg-white
                      hover:text-background font-bold'
            type="button">
              <Link to="/register">Or Create an Account</Link>
            </button>
          </div>
          <div className='flex items-center justify-center pt-6 text-white font-bold'>
            <p>Or Login With Google</p>
          </div>
          <div className='flex items-center justify-center pt-2'>
            <GoogleLogin onSuccess={handleGoogleLoginSuccess}/>
          </div>
    </div>
    </>
  );
}

export default LoginForm;
