import { React } from 'react';

function Error(props) {
    return (
        <div className='mx-auto background_box p-5'>
            <h1>Error</h1>
            <h4>{props.message}</h4>
        </div>
    );
}

export default Error;
