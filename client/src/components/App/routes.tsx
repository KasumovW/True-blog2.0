import { createBrowserRouter } from 'react-router-dom';
import Layout from '../../layouts/layout';
import Auth from '../../pages/Auth';
import Main from '../../pages/Main';
import Profile from '../../pages/Profile';
import NewPost from '../../pages/NewPost';
import PostDetail from '../../pages/PostDetail';
import ErrorPage from '../ErrorPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Main /> },
            { path: '/post/:postID', element: <PostDetail /> },
            { path: '/new-post', element: <NewPost state='add' /> },
            { path: '/change-post/:id', element: <NewPost state='edit' /> },
            { path: '/profile/:userID', element: <Profile /> },
        ],
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
