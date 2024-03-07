import { React, useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';

function GenrePage(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [genres, setGenres] = useState('');

    async function getData() {
        let types = await props.context.data.movies.genres;
        try {
            setGenres(types);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setGenres, setIsLoading]);

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
                    <h1>GenrePage</h1>
                </div>
            </div>
        );
    }
}

export default GenrePage;
