import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';

function Register(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');
    let [movies, setMovies] = useState('');
    let [genres, setGenres] = useState('');

    let [data, setData] = useState({
        name: '',
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

    let navigate = useNavigate();

    function registerUser(e) {
        e.preventDefault();
        if (!data.name) {
            setError('Please enter a name');
        } else {
            if (!data.email) {
                setError('Please enter an email');
            } else {
                if (!data.password) {
                    setError('Please enter a password');
                } else {
                    props.context.actions.registerUser(data.name, data.email, data.password).then(response => {
                        if (!response) {
                            navigate('/login');
                        }
                    });
                }
            }
        }
    }

    function form_filler() {
        return (
            <form action='/register' method='POST' onSubmit={registerUser}>
                <div>
                    <div>
                        <label className='w-100' htmlFor='name'>First Name</label>
                        <input type='text' id='name' name='name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}></input>
                    </div>
                    <div>
                        <label className='w-100' htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
                    </div>
                    <div>
                        <label className='w-100' htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
                    </div>
                    <button type='submit' onSubmit={registerUser}>Register</button>
                </div>
            </form>
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
            <div className='my-3'>
                <h1>Register</h1>
                {
                    form_filler()
                }
                <div className='mt-5'>
                    <p>Already have an account?</p><a href={'/login'}><button>Login</button></a>
                </div>

            </div>
        );
    }
}

export default Register;
