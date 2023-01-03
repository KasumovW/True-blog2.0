import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import s from './Header.module.scss';
import { Link } from 'react-router-dom';

type Props = {};

const index = (props: Props) => {
    return (
        <Box sx={{ flexGrow: 1 }} className={s.wrapper}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        MainPage
                    </Typography>
                    <Link to='/auth'>
                        <Button color='inherit'>Login</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default index;
