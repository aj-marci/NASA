import React, { useState } from 'react';
import axios from 'axios';

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
        password: password
      });

      const { token } = response.data;
      console.log(response.data);

      // Store the token in localStorage (or cookies for better security)
      localStorage.setItem('token', token);
      console.log(email, password);

      // Update the loggedIN state to indicate that the user is logged in
      setLoggedIN(true);

      // Optionally, you can redirect the user to a different page after successful login
    } catch (err) {
      console.log('Invalid credentials');
    }
  };


  // need to add button to signup component
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
    </>
  );
}

export default LoginForm;
