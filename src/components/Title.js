import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import NotFound from './NotFound';
import Cookies from 'js-cookie';

function Title(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [user, setUser] = useState('');
    let [movie, setMovie] = useState('');
    let [isChecked, setIsChecked] = useState(false);
    let { url } = useParams();
    let fresh_cookies;

    async function getData() {
        let films = await props.context.data.movies.movies;
        let logger = await props.user;
        try {
            setUser(logger);
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

    useEffect(() => { getData() }, [setMovie, setIsChecked, setIsLoading]);

    function decade_finder() {
        let year = movie.year.toString();
        let new_year = year.slice(2, 3);
        if (new_year === 'classics') {
            return ('classics');
        }
        if (new_year === '7') {
            return ('70s');
        }
        if (new_year === '8') {
            return ('80s');
        }
        if (new_year === '9') {
            return ('90s');
        }
        if (new_year === '0') {
            return ('00s');
        }
        if (new_year === '1') {
            return ('10s');
        }
        if (new_year === '2') {
            return ('20s');
        }
    }

    fresh_cookies = Cookies.get(`myList-${user.email}-${movie.id}`);
    useEffect(() => {
        if (fresh_cookies !== undefined && fresh_cookies !== '') {
            setIsChecked(true);
        }
    });

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

            function cookie_handler() {
                if (props.user === '' || props.user === undefined) {
                    return (
                        <div className='mt-4'>
                            <h1><a className='nonchalant' href='/titles'>{movie.title}</a></h1>
                        </div>
                    );
                } else {

                    if (isChecked === true) {
                        return (
                            <div className='mt-4'>
                                <h1><a className='nonchalant' href='/titles'>{movie.title}</a></h1>
                                <p className='mt-2'>Added to your list!</p>
                            </div>
                        );
                    } else {
                        return (
                            <div className='my-3'>
                                <h1><a className='nonchalant' href='/titles'>{movie.title}</a></h1>
                                <button className='mt-2 list_button' onClick={() => {
                                    //needs logic to determine what to do when cookie doesn't exist yet
                                    Cookies.set(`myList-${props.user.email}-${movie.id}`, `${movie.title}`, { expires: 7 });
                                    setIsChecked(true);
                                }}>Add to My List</button>
                            </div>
                        );
                    }
                }
            }

            return (
                <div className='row align-items-start background_box rounded my-5'>

                    <div className='col m-auto title_text'>
                        {cookie_handler()}
                        <div className='py-3'>
                            <span>Writer(s)</span>
                            <br></br>
                            <div className='p-1'>
                                {movie.writers.map(
                                    (writer, i) => {
                                        if (writer.length > 1) {
                                            if (i === movie.writers.length - 1) {
                                                return (
                                                    <span key={i}>{`${writer}`}</span>
                                                );
                                            } else {
                                                return (
                                                    <span key={i}>{`${writer}, `}</span>
                                                );
                                            }

                                        }

                                    }
                                )}
                            </div>
                            <br></br>
                            <div>
                                <span>Director(s)</span>
                                {movie.directors.map(
                                    (directors, i) => {
                                        return (
                                            <p key={i} className='p-1'>{directors}</p>
                                        );
                                    }
                                )}
                            </div>
                            <div className='p-1'>
                                <span>Release Year</span>
                                <a className='nonchalant_color' href={`/decades/${decade_finder()}`}><p>{movie.year}</p></a>
                            </div>
                            <div className='p-1'>
                                <span>Genres</span>
                                <br></br>
                                {movie.genres.map(
                                    (genre, i) => {
                                        if (i < movie.genres.length - 1) {
                                            return (
                                                <a key={i} href={`/genres/${genre.toLowerCase()}`} className='nonchalant_color'>{`${genre}, `}</a>
                                            );
                                        } else {
                                            return (
                                                <a key={i} href={`/genres/${genre.toLowerCase()}`} className='nonchalant_color'>{genre}</a>
                                            );
                                        }
                                    }
                                )}
                            </div>
                            <div className='p-3'>
                                <span>Links</span>
                                <br></br>
                                <span><a className='nonchalant_color' href={movie.prime_link}>Amazon, </a><a className='nonchalant_color' href={movie.youtube_link}>YouTube</a></span>
                            </div>
                        </div>
                    </div>
                    <div className='col title_pic_div'>
                        <img className='mx-auto title_pic' src={`${movie.photo}.jpg`} />
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
