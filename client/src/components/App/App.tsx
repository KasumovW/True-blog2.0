import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../../layouts/layout';
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
    ]);

    return (
        <div className='App'>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;

