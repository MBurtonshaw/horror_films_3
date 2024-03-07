import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import NotFound from './NotFound';

function Title(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movie, setMovie] = useState('');
    let { url } = useParams();

    async function getData() {
        let films = await props.context.data.movies.movies;
        try {
            films.map(
                item => {
                    if (item.url === url) {
                        setMovie(item);
                    }
                }
            );
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setMovie, setIsLoading]);

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
        if (movie && isLoading === false) {
            return (
                <div>
                    <div className='mx-auto background_box p-5'>
                        <h1>Title</h1>
                        <h3>{movie.title}</h3>
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

export default Title;
