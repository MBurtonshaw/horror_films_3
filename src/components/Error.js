import { React } from 'react';

function Error(props) {
    return (
        <div>
            <h1>Error</h1>
            <h4 className='my-5'>{props.message}</h4>
        </div>
    );
}

export default Error;
