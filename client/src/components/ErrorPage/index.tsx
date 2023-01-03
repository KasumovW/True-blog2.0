import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const index = (props: Props) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <h1>Oops!</h1>
            <h4>Sorry, an unexpected error has occurred.</h4>
            <h4>
                <i style={{ color: 'gray' }}>Not Found</i>
            </h4>
            <Link to='/'>To main page</Link>
        </div>
    );
};

export default index;
