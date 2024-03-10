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

    function carousel_filler(title, href, src, id) {
        if (id === 1) {
            if (window.innerWidth < 1400) {
                if (window.innerWidth < 992) {
                    return (
                        <div key={id} className="carousel-item active background_box_2 rounded p-3">
                            <a href={href}>
                                <img src={src} className="m-auto w-100 rounded_photo" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{title}</h5>
                                </div>
                            </a>
                        </div>
                    );
                }
                return (
                    <div key={id} className="carousel-item active background_box_2 rounded p-4">
                        <a href={href}>
                            <img src={src} className="m-auto w-100 rounded_photo" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{title}</h5>
                            </div>
                        </a>
                    </div>
                );
            }
            return (
                <div key={id} className="carousel-item active background_box_2 rounded p-2">
                    <a href={href}>
                        <img src={src} className="m-auto w-100 p-3 rounded_photo" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{title}</h5>
                        </div>
                    </a>
                </div>
            );
        } else {
            if (window.innerWidth < 1400) {
                if (window.innerWidth < 992) {
                    return (
                        <div key={id} className="carousel-item background_box_2 rounded p-3">
                            <a href={href}>
                                <img src={src} className="m-auto w-100 rounded_photo" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{title}</h5>
                                </div>
                            </a>
                        </div>
                    );
                }
                return (
                    <div key={id} className="carousel-item background_box_2 rounded p-4">
                        <a href={href}>
                            <img src={src} className="m-auto w-100 rounded_photo" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{title}</h5>
                            </div>
                        </a>
                    </div>
                );
            }
            return (
                <div key={id} className="carousel-item background_box_2 rounded p-2">
                    <a href={href}>
                        <img src={src} className="m-auto w-100 p-3 rounded_photo" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{title}</h5>
                        </div>
                    </a>
                </div>
            );
        }
    }

    function genre_carousel() {
        if (movies) {
            if (window.innerWidth < 992) {
                return (
                    <div id="genreCarousel" className="carousel slide small_carousel">
                        <h4 className='dosis-text-header'>{`Genre: ${props.context.actions.capitalizeFirstLetter(url)}`}</h4>
                        <div>
                            <div className="carousel-indicators">
                                {
                                    movies.map(
                                        (item, i) => {
                                            if (i === 1) {
                                                return (
                                                    <button key={i} type="button" data-bs-target="#genreCarousel" data-bs-slide-to="1" className="active" aria-current="true" aria-label="Slide 1"></button>
                                                );
                                            } else if (i === movies.length) {
                                                return (
                                                    <button key={i} type="button" data-bs-target="#genreCarousel" data-bs-slide-to="0" aria-label={`Slide 18`}></button>
                                                );
                                            } else {
                                                return (
                                                    <button key={i} type="button" data-bs-target="#genreCarousel" data-bs-slide-to={i} aria-label={`Slide ${i}`}></button>
                                                );
                                            }
                                        }
                                    )
                                }
                            </div>
                            <div className="carousel-inner inner_width_adj">
                                {
                                    movies.map((item, i) => {
                                        return (
                                            carousel_filler('', `/titles/${item.url}`, `../photos/titles/${item.url}_rectangle.jpg`, i)
                                        );
                                    }
                                    )
                                }
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#genreCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#genreCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                );
            }
            return (
                <div id="genreCarousel" className="carousel slide main_carousel">
                    <h4 className='dosis-text-header'>{`Genre: ${props.context.actions.capitalizeFirstLetter(url)}`}</h4>
                    <div>
                        <div className="carousel-indicators">
                            {
                                movies.map(
                                    (item, i) => {
                                        if (i === 1) {
                                            return (
                                                <button key={i} type="button" data-bs-target="#genreCarousel" data-bs-slide-to="1" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            );
                                        } else if (i === movies.length) {
                                            return (
                                                <button key={i} type="button" data-bs-target="#genreCarousel" data-bs-slide-to="0" aria-label={`Slide 18`}></button>
                                            );
                                        } else {
                                            return (
                                                <button key={i} type="button" data-bs-target="#genreCarousel" data-bs-slide-to={i} aria-label={`Slide ${i}`}></button>
                                            );
                                        }
                                    }
                                )
                            }
                        </div>
                        <div className="carousel-inner inner_width_adj">
                            {
                                movies.map((item, i) => {
                                    return (
                                        carousel_filler('', `/titles/${item.url}`, `../photos/titles/${item.url}_rectangle.jpg`, i)
                                    );
                                }
                                )
                            }
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#genreCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#genreCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            );
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
        if (movies.length > 1) {

            return (
                <div className='background_box rounded_large'>
                    {
                        genre_carousel()
                    }
                </div>
            );
        } else {
            return (
                <NotFound message={url} />
            );
        }
    }
}

export default Genre;
