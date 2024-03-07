import { React, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Header() {
    if (window.innerWidth < 525) {
        return (
            <div>
                <h1 className='main_header_1'>Horror Films</h1>
                <div className='main_header_2'>
                    <img src='../photos/menu_icon.png' className='width_adjuster m-auto' />
                </div>
            </div>
        );
    }
    return (
        <div className='row'>
            <h1 className='col align-self-center main_header_1'>Horror Films</h1>
            <div className='col align-self-end main_header_2'>
                <img src='../photos/menu_icon.png' className='width_adjuster m-auto' />
            </div>
        </div>
    );
}

export default Header;
