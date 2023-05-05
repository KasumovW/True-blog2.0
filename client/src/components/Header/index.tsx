import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import s from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../redux/slice/userSlice';
type Props = {};

const index = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.user.token);

    const handleExit = () => {
        dispatch(logout());
        navigate('/');
        window.location.reload();
    };

    return (
        <Box sx={{ flexGrow: 1 }} className={s.wrapper}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        <Link to='/'>MainPage</Link>
                    </Typography>
                    {token ? (
                        <Button onClick={handleExit} color='inherit'>
                            Logout
                        </Button>
                    ) : (
                        <Link to='/auth'>
                            <Button color='inherit'>Login</Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default index;
