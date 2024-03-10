import { React, useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';
import Cookies from 'js-cookie';

function List(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
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
        if (filmList) {
            return (
                filmList.map(
                    (item, i) => {
                        if (window.innerWidth < 992) {
                            if (i === 0) {
                                return (
                                    <div key={i} className='my-5'>
                                        <h5 className='w-100'><a className='nonchalant dosis-text-list' href={`/titles/${item.url}`}>{item.title}</a></h5>
                                        <button className='list_button px-3 dosis-text-button' onClick={() => {
                                            Cookies.remove(`myList-${user.email}-${item.id}`, { path: `/` });
                                            window.location.reload();
                                        }}>Remove</button>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={i} className='mt-5'>
                                        <h5 className='w-100'><a className='nonchalant dosis-text-list' href={`/titles/${item.url}`}>{item.title}</a></h5>
                                        <button className='list_button px-3 dosis-text-button' onClick={() => {
                                            Cookies.remove(`myList-${user.email}-${item.id}`, { path: `/` });
                                            window.location.reload();
                                        }}>Remove</button>
                                    </div>
                                );
                            }
                        }
                        if (i === 0) {
                            return (
                                <div key={i} className='row justify-content-end'>
                                    <div className='col-4 mt-5 py-2'>
                                        <h5 className=''><a className='nonchalant dosis-text-list' href={`/titles/${item.url}`}>{item.title}</a></h5>
                                    </div>
                                    <div className='col-4 py-2 mt-5'>
                                        <button className='list_button px-3 dosis-text-button' onClick={() => {
                                            Cookies.remove(`myList-${user.email}-${item.id}`, { path: `/` });
                                            window.location.reload();
                                        }}>Remove</button>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={i} className='row justify-content-end'>
                                    <div className='col-4 py-2'>
                                        <h5 className=''><a className='nonchalant dosis-text-list' href={`/titles/${item.url}`}>{item.title}</a></h5>
                                    </div>
                                    <div className='col-4 py-2'>
                                        <button className='list_button px-3 dosis-text-button' onClick={() => {
                                            Cookies.remove(`myList-${user.email}-${item.id}`, { path: `/` });
                                            window.location.reload();
                                        }}>Remove</button>
                                    </div>
                                </div>
                            );
                        }

                    }
                )
            );
        } else {
            return (
                <div className='my-5'>
                    <h3> No movies added to list yet </h3>
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
        return (
            <div>
                <div className='mx-auto background_box p-5 my_list_border'>
                    <h1>My Movie List</h1>
                    {content_filler()}
                </div>
            </div>
        );
    }
}

export default List;
