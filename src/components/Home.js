import { React, useState, useEffect } from 'react';
import Main from './Main';
import Loading from './Loading';
import Error from './Error';

function Home(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movies, setMovies] = useState('');
    let [genres, setGenres] = useState('');

    async function getData() {
        let films = await props.context.data.movies.movies;
        let types = await props.context.data.movies.genres;
        try {
            setMovies(films);
            setGenres(types);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setIsLoading]);

    if (isLoading) {
        return (
            <div className='mt-5 w-75 mx-auto'>
                <Loading />
            </div>
        );
    } else {
        if (error) {
            return (
                <Error message={error} />
            );
        }
        return (
            <div>
                <div className='mt-5 w-75 mx-auto'>
                    <Main movies={movies} genres={genres} />
                </div>
            </div>
        );
    }
}

export default Home;
