import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from './routes';

const App: React.FC = () => {
    return (
        <div className='App'>
            <RouterProvider router={router} />
            <ToastContainer />
        </div>
    );
};

export default App;
