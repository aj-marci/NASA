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
      console.log(response.data);


      localStorage.setItem('token', token);
      console.log(email, password);


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
    // You can also set the user information in local storage if needed
    // localStorage.setItem('googleUserInfo', JSON.stringify(googleUser));
  };



  return (
    <>
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
    <div>
      <button>
          <Link to="/register">Or Create an Account</Link>
      </button>
    </div>
    <div>
      <GoogleLogin onSuccess={handleGoogleLoginSuccess}/>
    </div>
    </>
  );
}

export default LoginForm;
