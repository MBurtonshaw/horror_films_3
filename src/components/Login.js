import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';

function Login(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movies, setMovies] = useState('');
    let [genres, setGenres] = useState('');
    let [data, setData] = useState({
        email: '',
        password: ''
    })

    async function getData() {
        try {
            setMovies('');
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => { getData() }, [setIsLoading]);

    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        if (!data.email) {
            setError('Please enter an email address');
        } else {
            if (!data.password) {
                setError('Please enter a password');
            } else {
                //signing in through Context with email and password from state
                props.context.actions.signIn(data.email, data.password).then(response => {
                    //if there's any response from Context, it'll be an error
                    //so that response will be set to setError and be rendered as <Error /> below
                    if (response) {
                        setError(response);
                    } else {
                        //if there's no response, user is taken to the homepage and is now logged in
                        navigate('/');
                        window.location.reload();
                    }
                });
            }
        }
    }

    function form_filler() {

        return (
            <div>
                <form action='/login' method='POST' onSubmit={loginUser}>
                    <div>
                        <div>
                            <label className='w-100' htmlFor='email'>Email</label>
                            <input type='email' id='email' name='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
                        </div>
                        <div>
                            <label className='w-100' htmlFor='password'>Password</label>
                            <input type='password' id='password' name='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
                        </div>
                        <button type='submit' onSubmit={loginUser}>Login</button>
                    </div>
                </form>
                <div className='mt-5'>
                    <p>Don't have an account yet?</p><a href={'/register'}><button>Register</button></a>
                </div>
            </div>
        )

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
            <div className='my-5'>
                <h1>Login</h1>
                {
                    form_filler()
                }
            </div>
        );
    }
}

export default Login;
