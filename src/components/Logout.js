import { React, useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';

function Logout() {
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
                <div className='mx-auto background_box p-5'>
                    <h1>Logout</h1>
                </div>
            </div>
        );
    }
}

export default Logout;
