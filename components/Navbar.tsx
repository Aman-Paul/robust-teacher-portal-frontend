"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Image from 'next/image';
import "./navbarStyle.css";
import { resetAllReduxData } from '@/redux/resetAllReducers';

function Navbar() {
    const handleLogout = () => {
        resetAllReduxData();
    }

    return (
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Image
                        src="https://tailwebs.com/wp-content/uploads/2023/03/Group-222-300x50.png"
                        alt="Tailwebs Logo"
                        width={100}
                        height={40}
                        layout="intrinsic"
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>
                        <div className='nav'>Home</div>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <div className='nav' onClick={handleLogout}>Logout</div>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
