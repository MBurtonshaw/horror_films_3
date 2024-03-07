import { React, useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';

function Main(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movies, setMovies] = useState('');
    let [genres, setGenres] = useState('');

    async function getData() {
        let films = await props.movies;
        let types = await props.genres;
        try {
            setMovies(films);
            setGenres(types);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setMovies, setGenres, setIsLoading])

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
                <div className='mx-auto'>
                    <h1>jkdhasfhjkdfsjhkdfs</h1>
                </div>
            </div>
        );
    }
}

export default Main;
