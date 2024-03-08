import { React, useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';

function Main(props) {
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

    useEffect(() => { getData() }, [setMovies, setGenres, setIsLoading]);

    function carousel_filler(title, href, src, id) {
        if (id === 1) {
            return (
                <div key={id} className="carousel-item active">
                    <a href={href}>
                        <img src={src} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{title}</h5>
                        </div>
                    </a>
                </div>
            );
        } else {
            return (
                <div key={id} className="carousel-item">
                    <a href={href}>
                        <img src={src} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{title}</h5>
                        </div>
                    </a>
                </div>
            );
        }
    }

    function genre_carousel() {
        let genres = props.context.data.movies.genres;
        return (
            <div id="genreCarousel" className="carousel slide main_carousel">

                <h4 className='dosis-text-header my-4'>Genres</h4>
                <div className="carousel-indicators">
                    {
                        genres.map(
                            (item, i) => {
                                if (item.id === 1) {
                                    return (
                                        <button key={i} type="button" data-bs-target="#genreCarousel" data-bs-slide-to="1" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    );
                                } else if (item.id === 18) {
                                    return (
                                        <button key={i} type="button" data-bs-target="#genreCarousel" data-bs-slide-to="0" aria-label={`Slide 18`}></button>
                                    );
                                } else {
                                    return (
                                        <button key={i} type="button" data-bs-target="#genreCarousel" data-bs-slide-to={item.id} aria-label={`Slide ${item.id}`}></button>
                                    );
                                }
                            }
                        )
                    }
                </div>
                <div className="carousel-inner">
                    {
                        genres.map((item, i) => {
                            return (
                                carousel_filler(genres[i].name, `/genres/${genres[i].name.toLowerCase()}`, `../photos/genres/${genres[i].name.toLowerCase()}.jpg`, genres[i].id)
                            );
                        }
                        )
                    }
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

    function decades_carousel() {
        let decades = [
            'classics',
            '70s',
            '80s',
            '90s',
            '00s',
            '10s',
            '20s'
        ];
        return (
            <div id="decadesCarousel" className="carousel slide main_carousel my-3 mt-5">

                <h4 className='dosis-text-header my-4'>Decades</h4>
                <div className="carousel-indicators">
                    {
                        decades.map(
                            (item, i) => {
                                if (i === 0) {
                                    return (
                                        <button key={i} type="button" data-bs-target="#decadesCarousel" data-bs-slide-to={i} className="active" aria-current="true" aria-label="Slide 1"></button>
                                    );
                                } else if (i === decades.length) {
                                    return (
                                        <button key={i} type="button" data-bs-target="#decadesCarousel" data-bs-slide-to="0" aria-label={`Slide ${i}`}></button>
                                    );
                                } else {
                                    return (
                                        <button key={i} type="button" data-bs-target="#decadesCarousel" data-bs-slide-to={i} aria-label={`Slide ${i}`}></button>
                                    );
                                }
                            }
                        )
                    }
                </div>
                <div className="carousel-inner">
                    {
                        decades.map((item, i) => {
                            return (
                                carousel_filler(decades[i], `/decades/${decades[i]}`, `../photos/decades/${decades[i]}.jpg`, i)
                            );
                        })
                    }
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#decadesCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#decadesCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

            </div>
        );
    }

    function titles_carousel() {
        let titles = props.context.data.movies.movies;
        return (
            <div id="titlesCarousel" className="carousel slide main_carousel my-3">

                <h4 className='dosis-text-header my-4'>Full Catalogue</h4>
                <div className="carousel-indicators">
                    {
                        titles.map(
                            (item, i) => {
                                if (item.id === 1) {
                                    return (
                                        <button key={i} type="button" data-bs-target="#titlesCarousel" data-bs-slide-to="1" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    );
                                } else if (item.id === titles.length) {
                                    return (
                                        <button key={i} type="button" data-bs-target="#titlesCarousel" data-bs-slide-to="0" aria-label={`Slide ${item.id}`}></button>
                                    );
                                } else {
                                    return (
                                        <button key={i} type="button" data-bs-target="#titlesCarousel" data-bs-slide-to={item.id} aria-label={`Slide ${item.id}`}></button>
                                    );
                                }
                            }
                        )
                    }
                </div>
                <div className="carousel-inner">
                    {
                        titles.map((item, i) => {
                            return (
                                carousel_filler('', `/titles/${titles[i].url}`, `../photos/titles/${titles[i].url}_rectangle.jpg`, titles[i].id)
                            );
                        }
                        )
                    }
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#titlesCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#titlesCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

            </div>
        );
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
        return (
            <div className='background_box'>
                <div>
                    {genre_carousel()}
                </div>
                <div className='mx-auto py-3'>
                    {decades_carousel()}
                </div>
                <div className='mx-auto py-3'>
                    {titles_carousel()}
                </div>
            </div>
        );
    }
}

export default Main;





