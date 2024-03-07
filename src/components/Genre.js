import { React, useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';

function Genre() {
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
            <div >

            </div>
        );
    }
}

export default Genre;
