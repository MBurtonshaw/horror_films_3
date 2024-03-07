import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';

function Logout(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movies, setMovies] = useState('');
    let [genres, setGenres] = useState('');

    async function getData() {
        try {
            setMovies('');
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setIsLoading]);

    const navigate = useNavigate();

    function logoutUser(e) {
        e.preventDefault();
        props.context.actions.signOut();
        navigate('/');
        window.location.reload();
    }

    function content_filler() {
        if (window.innerWidth < 768) {
            <div className='m-5 p-5'>
                <h1>Logout</h1>
                <form action='/login' method='POST' onSubmit={logoutUser}>
                    <div>
                        <h2 className='mt-5'>Are you sure?</h2>
                        <button className='mt-2' onClick={logoutUser}>Logout</button>
                    </div>
                </form>
                <a href={'/'}><button className='mt-2'>Home</button></a>
            </div>
        }
        return (
            <div className='m-5'>
                <h1>Logout</h1>
                <form action='/login' method='POST' onSubmit={logoutUser}>
                    <div>
                        <h2 className='mt-5'>Are you sure?</h2>
                        <button className='mt-2' onClick={logoutUser}>Logout</button>
                    </div>
                </form>
                <a href={'/'}><button className='mt-2'>Home</button></a>
            </div>
        );
    }

    if (isLoading) {
        return (
            <Loading />
        );
    } else {
        if (error) {
            return (
                <Error message={error} />
            );
        }
        return (
            <div>
                {
                    content_filler()
                }
            </div>
        );
    }
}

export default Logout;
