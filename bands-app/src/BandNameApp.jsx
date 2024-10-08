import React from 'react';
import { SocketProvider } from './context/SocketContext';
import HomePage from './HomePage';

export const BandNameApp = () => {
    return (
        <SocketProvider>
            <HomePage />
        </SocketProvider>
    )
}
