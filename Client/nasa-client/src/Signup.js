import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail } from "./utils";
import { Link } from 'react-router-dom';

function Signup() {

  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate("");

  const handleSignUpEmail = (e) => {
    setSignupEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };

  const handleSignUpPassword = (e) => {
    setSignupPassword(e.target.value);
    setPasswordError(e.target.value.length < 8);
  };

  const PasswordErrorMessage = (e) => {
    return (
      <p className='flex items-center justify-center text-formError font-semibold mt-2'>
        Password should have at least 8 characters.</p>
    );
  };

  const EmailErrorMessage = (e) => {
    return (
      <p className='flex items-center justify-center text-formError font-semibold mt-2'>
        Please use a valid email address.</p>
    );
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
            onChange={handleSignUpEmail}/>
          </div>
          <div>
              {emailError ? (
            < EmailErrorMessage />
          ) :null}
            </div>
          <div className='flex items-center justify-center pt-4 font-semibold'>
            <p>Your Password</p>
          </div>
          <div className='flex items-center justify-center text-background text-sm'>
            <input
            className='rounded border-lightblueText px-4 py-1 focus:outline-none focus:border-4'
            type="password"
            value={signupPassword}
            onChange={handleSignUpPassword}/>
          </div>
          <div>
              {passwordError ? (
            < PasswordErrorMessage />
          ) :null}
            </div>
          <div className='flex items-center justify-center pt-4'>
          {validateEmail(signupEmail) && signupPassword.length >= 8 ? (
            <button
            className='bg-lightblueText text-background rounded px-2 py-2
                font-semibold hover:bg-white'
            type="button"
            onClick={handleSignUp}>
              Create Account
            </button>
            ) :null}
          </div>
        </form>
        <div className='flex items-center justify-center pt-6'>
          <button className='bg-background text-lightblueText rounded px-2 py-2 hover:bg-white
                      hover:text-background font-bold'
            type="button">
              <Link to="/">Back to Login</Link>
          </button>
        </div>
    </div>
    </>
  );
}

export default Signup;
