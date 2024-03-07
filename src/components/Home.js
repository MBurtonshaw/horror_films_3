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
            <div className='row align-items-start mx-auto mt-5'>
                <div className='col'></div>
                <div className='col'>
                    <Loading />
                </div>
                <div className='col'></div>
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
                <div className='row align-items-start mx-auto mt-5'>
                    <div className='col'></div>
                    <div className='col'>
                        <Main movies={movies} genres={genres} />
                    </div>
                    <div className='col'></div>
                </div>
            </div>
        );
    }
}

export default Home;
