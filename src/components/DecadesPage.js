import { React, useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';

function DecadesPage() {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movies, setMovies] = useState('');
    let [decades, setDecades] = useState('');

    async function getData() {
        try {
            setDecades([
                'classics',
                '70s',
                '80s',
                '90s',
                '00s',
                '10s',
                '20s'
            ]);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setDecades, setIsLoading]);

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
                    <h1>DecadesPage</h1>
                </div>
            </div>
        );
    }
}

export default DecadesPage;
