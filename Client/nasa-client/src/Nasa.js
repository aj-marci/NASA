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
        <div className="flex-col bg-background h-fit text-lightblueText px-8 font-master">
            <div className='flex items-center justify-center pt-12 text-2xl font-bold'>
                <h1>Daily NASA Astronomy Image</h1>
            </div>
            <div className='flex items-center justify-center pt-4 italic text-white'>
                <p>{apodData.date}</p>
            </div>
            <div className='flex items-center justify-center pt-4 text-xl font-semibold'>
                <h2>{apodData.title}</h2>
            </div>
            <div className='flex items-center justify-center pt-4'>
                <img className='rounded h-auto max-w-md'
                src={apodData.hdurl}
                alt={apodData.title}/>
            </div>
            <div className='flex items-center justify-center pt-4 italic text-sm'>
                <p>Image copyright, {apodData.copyright}</p>
            </div>
            <div className='flex items-center justify-center pt-4 text-white
                text-base indent-4 font-semibold leading-relaxed'>
                <p>{apodData.explanation}</p>
            </div>
            <div className='flex items-center justify-center pt-4'>
                <button className='bg-lightblueText text-background rounded
                px-2 py-2 mb-8 hover:bg-white font-semibold'
                onClick={handleLogout}>Logout</button>
            </div>
        </div>
        </>
    )
}

export default NASA;