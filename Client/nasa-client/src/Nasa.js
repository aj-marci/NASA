import React, { useEffect, useState } from 'react';
import "./App.css";

function NASA() {

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
        <div>
            <div className='flex items-center justify-center pt-12'>
                <h1>Welcome! Enjoy a new Image Daily from NASA 👽</h1>
            </div>
            <div>
                <p>{apodData.date}</p>
                <h2>{apodData.title}</h2>
                <img className='img' src={apodData.hdurl} alt={apodData.title}/>
                <p>Image copyright, {apodData.copyright}</p>
                <p>{apodData.explanation}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
        </>
    )
}

export default NASA;