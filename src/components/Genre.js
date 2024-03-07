import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import NotFound from './NotFound';

function Genre(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movies, setMovies] = useState('');
    let { url } = useParams();

    async function getData() {
        let unfiltered = await props.context.data.movies.movies;
        let filtered_array = [];
        try {
            for (let i = 0; i < unfiltered.length; i++) {
                unfiltered[i].genres.map(
                    item => {
                        if (item.toLowerCase() === url) {
                            filtered_array.push(unfiltered[i]);
                        }
                    }
                );
            }
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
        if (movies.length > 1) {
            return (
                <div>
                    <div className='mx-auto background_box p-5'>
                        <h1>Genre</h1>
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

export default Genre;
