import React, { useState } from 'react';
import Home from './Homepage';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIN, setLoggedIN] = useState();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
  };

  return (
    <>
    {loggedIN ? (
    <div>
      <h2>Signup</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="button" onClick={handleLogin}>Signup</button>
      </form>
    </div>
    ) : (
     <Home />
     )}
    </>
  );
}

export default LoginForm;
