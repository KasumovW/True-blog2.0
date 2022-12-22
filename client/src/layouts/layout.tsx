import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

type Props = {};

const layout = (props: Props) => {
    return (
        <div>
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </div>
    );
};

export default layout;
