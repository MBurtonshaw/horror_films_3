import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import NotFound from './NotFound';

function Decades(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movies, setMovies] = useState('');
    let { url } = useParams();

    async function getData() {
        let unfiltered = await props.context.data.movies.movies;
        let filtered_array = [];
        try {
            unfiltered.map(
                (item) => {
                    if (url === 'classics') {
                        if (item.year < 1970) {
                            filtered_array.push(item)
                        }
                    }
                    if (url === '70s') {
                        if (item.year > 1969 && item.year < 1980) {
                            filtered_array.push(item)
                        }
                    }
                    if (url === '80s') {
                        if (item.year > 1979 && item.year < 1990) {
                            filtered_array.push(item)
                        }
                    }
                    if (url === '90s') {
                        if (item.year > 1989 && item.year < 2000) {
                            filtered_array.push(item)
                        }
                    }
                    if (url === '00s') {
                        if (item.year > 1999 && item.year < 2010) {
                            filtered_array.push(item)
                        }
                    }
                    if (url === '10s') {
                        if (item.year > 2009 && item.year < 2020) {
                            filtered_array.push(item)
                        }
                    }
                    if (url === '20s') {
                        if (item.year > 2019 && item.year < 2030) {
                            filtered_array.push(item)
                        }
                    }
                }
            );
            setMovies(filtered_array);
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
        if (movies.length > 0) {
            return (
                <div>
                    <div className='mx-auto background_box p-5'>
                        <h1>Decades</h1>
                        <h3>{url}</h3>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='py-5 my-5 mx-auto'>
                    <NotFound message={url} />
                </div>
            );
        }
    }
}

export default Decades;
