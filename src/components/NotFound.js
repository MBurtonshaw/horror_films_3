import { React } from 'react';

export default function NotFound(props) {
    if (window.innerWidth < 768) {
        return (
            <div className='mx-auto background_box p-5'>
                <h1>{props.message}</h1>
                <h1>Not Found</h1>
            </div>
        );
    }
    return (
        <div className='mx-auto background_box p-5'>
            <h1>{props.message}</h1>
            <h1>Not Found</h1>
        </div>
    );
}