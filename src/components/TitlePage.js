import { React, useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';

function TitlePage(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movies, setMovies] = useState('');

    async function getData() {
        let films = await props.context.data.movies.movies;
        try {
            setMovies(films);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setMovies, setIsLoading]);

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
                    <h1>TitlePage</h1>
                </div>
            </div>
        );
    }
}

export default TitlePage;
