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
    <div>
      <h2>Signup</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="text" value={signupEmail} onChange={handleSignUpEmail} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={signupPassword} onChange={handleSignUpPassword} />
        </div>
        <button type="button" onClick={handleSignUp}>Signup</button>
      </form>
    </div>
    </>
  );
}

export default Signup;
