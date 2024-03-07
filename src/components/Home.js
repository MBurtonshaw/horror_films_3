import { React, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';


function Home() {
    return (
        <div className='row align-items-start my-5 mx-auto'>
            <div className='col'></div>
            <div className='col'>
                <Main />
            </div>
            <div className='col'></div>
        </div>
    );
}

export default Home;
