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
        <div className="flex-col bg-background h-screen">
            <div className='flex items-center justify-center pt-12'>
                <h1>Welcome! Enjoy a new Image Daily from NASA 👽</h1>
            </div>
            <div className='flex items-center justify-center pt-4'>
                <p>{apodData.date}</p>
            </div>
            <div className='flex items-center justify-center pt-4'>
                <h2>{apodData.title}</h2>
            </div>
            <div className='flex items-center justify-center pt-4'>
                <img className='img' src={apodData.hdurl} alt={apodData.title}/>
            </div>
            <div className='flex items-center justify-center pt-4'>
                <p>Image copyright, {apodData.copyright}</p>
            </div>
            <div className='flex items-center justify-center pt-4'>
                <p>{apodData.explanation}</p>
            </div>
            <div className='flex items-center justify-center pt-4'>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
        </>
    )
}

export default NASA;