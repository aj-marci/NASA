import LoginForm from "./Login";
import React, { useEffect, useState } from 'react';
import "./App.css";

function Home () {

const [apodData, setApodData] = useState("");

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
}

useEffect(() => {
  fetch('http://localhost:5000/api/apod')
    .then(response => response.json())
    .then(data => setApodData(data))
}, []);


    return (
        <>
        {localStorage.getItem('token') ? (
        <div>
            <div>
                <h1>Welcome! Enjoy a new Image Daily from NASA 👽</h1>
                <p>{apodData.date}</p>
                <img className="img" src={apodData.hdurl} alt={apodData.title}/>
                <p>Image copyright, {apodData.copyright}</p>
                <p>{apodData.explanation}</p>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
        ) : (
          <LoginForm />
        )}
        </>
    )
}

export default Home;