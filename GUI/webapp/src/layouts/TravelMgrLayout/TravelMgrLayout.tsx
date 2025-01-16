import React from 'react';
import { Outlet } from 'react-router-dom';
import "./TravelMgrLayout.scss";
//import { RequireAuth } from '@/features/auth/RequireAuth';
import AppLayout from './AppLayout/AppLayout';
import './TravelMgrLayout.scss';


const TravelMgrLayout: React.FC = () => {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout> 
    );
        
}

export default TravelMgrLayout;
