import { React } from 'react';

function Header(props) {
    if (props.user === '' || props.user === undefined) {
        return (
            <div className='row align-items-start'>
                <div className='col'></div>
                <div id='Header' className='container col'>
                    <div className="dropdown w-100 m-auto">
                        <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src='../photos/menu_icon.png' className='width_adjuster m-auto' />
                        </button>
                        <ul className="dropdown-menu text-center w-100 m-auto header_background">
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a className='header_item' href='/'>Home</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a className='header_item' href='/login'>Login</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a className='header_item' href='/register'>Register</a>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col'></div>
            </div>
        );
    } else {
        return (
            <div className='row align-items-start'>
                <div className='col'></div>
                <div id='Header' className='container col'>
                    <div className="dropdown w-100 m-auto">
                        <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src='../photos/menu_icon.png' className='width_adjuster m-auto' />
                        </button>

                        <ul className="dropdown-menu text-center w-100 m-auto header_background">
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a className='header_item' href='/'>Home</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a className='header_item' href='/list'>My List</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a className='header_item' href='/logout'>Logout</a>
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className='col'></div>
            </div>
        );
    }
}

export default Header;