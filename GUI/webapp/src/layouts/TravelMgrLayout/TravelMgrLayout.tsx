import React from 'react';
import { Outlet } from 'react-router-dom';
import "./global.scss";
//import { RequireAuth } from '@/features/auth/RequireAuth';
import AppLayout from './app-layout';


const TravelMgrLayout: React.FC = () => {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout> 
    );
        
}

export default TravelMgrLayout;
