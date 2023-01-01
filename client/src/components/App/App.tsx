import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../../layouts/layout';
import Auth from '../../pages/Auth';
import Main from '../../pages/Main';

import ErrorPage from '../ErrorPage';

const App: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [{ path: '/', element: <Main /> }],
            errorElement: <ErrorPage />,
        },
        {
            path: '/auth',
            element: <Auth state='auth' />,
            errorElement: <ErrorPage />,
        },
        {
            path: '/reg',
            element: <Auth state='reg' />,
            errorElement: <ErrorPage />,
        },
    ]);

    return (
        <div className='App'>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
