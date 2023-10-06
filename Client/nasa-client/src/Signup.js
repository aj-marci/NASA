import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signup() {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const navigate = useNavigate("");

  const handleSignUpEmail = (e) => {
    setSignupEmail(e.target.value);
  };

  const handleSignUpPassword = (e) => {
    setSignupPassword(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        email: signupEmail,
        password: signupPassword,
      });

      console.log(response.data.message);
      localStorage.setItem("token", "new user created")
      navigate("/");

    } catch (err) {
      console.error('Error registering user:', err);
    }
  };

  return (
    <>
    <div className="flex-col bg-background h-screen text-lightblueText px-4 font-master">
      <div className='flex items-center justify-center pt-12 text-2xl font-bold'>
        <h2>Create an Account to View NASA APOD</h2>
      </div>
        <form>
          <div className='flex items-center justify-center pt-4 font-semibold'>
            <p>Your Email</p>
          </div>
          <div className='flex items-center justify-center text-background text-sm'>
            <input
            className='rounded border-lightblueText px-4 py-1 focus:outline-none focus:border-4'
            type="text"
            value={signupEmail}
            onChange={handleSignUpEmail} />
          </div>
          <div className='flex items-center justify-center pt-4 font-semibold'>
            <p>Your Password</p>
          </div>
          <div className='flex items-center justify-center text-background text-sm'>
            <input
            className='rounded border-lightblueText px-4 py-1 focus:outline-none focus:border-4'
            type="password"
            value={signupPassword}
            onChange={handleSignUpPassword} />
          </div>
          <div className='flex items-center justify-center pt-4'>
            <button
            className='bg-lightblueText text-background rounded px-2 py-2 hover:bg-white'
            type="button"
            onClick={handleSignUp}>Create Account</button>
          </div>
        </form>
    </div>
    </>
  );
}

export default Signup;
