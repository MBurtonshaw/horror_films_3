import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import NotFound from './NotFound';
import Cookies from 'js-cookie';

function Title(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movie, setMovie] = useState('');
    let [isChecked, setIsChecked] = useState();
    let [user, setUser] = useState('');
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
            let fresh_cookie;
            for (let i = 0; i < props.context.data.movies.movies.length; i++) {
                let newTypes = await props.context.data.movies.movies;
                let newType = newTypes[i];
                if (document.cookie) {
                    fresh_cookie = Cookies.get(`myList-${user.email}-${newType.id}`);
                }
                if (fresh_cookie === undefined) {
                    setIsChecked(false);
                } else {
                    if (fresh_cookie === movie.title) {
                        setIsChecked(true);
                    }
                }
            }

            let logger = await props.user;
            setUser(logger);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setMovie, setIsLoading]);

    function cookie_handler() {
        if (props.user === '' || props.user === undefined) {
            return (
                <div className='mt-5'>
                    <h1><a className='nonchalant' href='/titles'>{movie.title}</a></h1>
                </div>
            );
        } else {
            if (isChecked === true) {
                return (
                    <div className='mt-5'>
                        <h1><a className='nonchalant' href='/titles'>{movie.title}</a></h1>
                        <p className='mt-2'>added to list</p>
                    </div>
                );
            } else {
                return (
                    <div className='mt-5'>
                        <h1><a className='nonchalant' href='/titles'>{movie.title}</a></h1>
                        <button className='mt-2' onClick={() => {
                            //needs logic to determine what to do when cookie doesn't exist yet
                            Cookies.set(`myList-${props.user.email}-${movie.id}`, `${movie.title}`, { expires: 7 });
                            setIsChecked(true);
                        }}>Add to My List</button>
                    </div>
                );
            }
        }
    }

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
                    {cookie_handler()}
                    <div className='mx-auto background_box p-5'>
                        <h1>Title</h1>
                        <h3>{movie.title}</h3>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <NotFound message={url} />
                </div>
            );
        }
    }
}

export default Title;
