import { React, useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';
import Cookies from 'js-cookie';

function List(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movies, setMovies] = useState('');
    let [filmList, setFilmList] = useState('');
    let [user, setUser] = useState('');
    let finalArray = [];

    async function getData() {
        let new_type = await props.user;
        setUser(new_type);
        if (isLoading) {
            if (filmList.length < 1) {
                if (!user) {
                    return null;
                } else {
                    let cookie_array = [];
                    for (let i = 0; i < props.context.data.movies.movies.length; i++) {
                        let cookies = Cookies.get(`myList-${user.email}-${i}`);
                        if (cookies !== undefined) {
                            cookie_array.push(cookies);
                        }
                    }
                    props.context.data.movies.movies.forEach(
                        item => {
                            if (cookie_array.includes(item.title)) {
                                finalArray.push(item);
                                setFilmList(finalArray);
                            }
                        }
                    );
                }
                setIsLoading(false);
            }
        }
    }
    useEffect(() => { getData() });


    function content_filler() {
        return(
            filmList.map(
                (item, i) => {
                    return (
                        <div key={i}>
                            <h5><a className='nonchalant' href={`/titles/${item.url}`}>{item.title}</a></h5>
                        </div>
                    );
                }
            )
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
            <div>
                <div className='mx-auto background_box p-5'>
                    <h1>List</h1>
                    {content_filler()}
                </div>
            </div>
        );
    }
}

export default List;
