import React from 'react';
import { Outlet } from 'react-router-dom';
import "./global.scss";
import { RequireAuth } from '@/features/auth/RequireAuth';
import AppLayout from './app-layout';


const TravelMgrLayout: React.FC = () => {
    return (
        <RequireAuth>
            <div className="root-layout">
               <AppLayout><Outlet /></AppLayout> 
            </div>
        </RequireAuth>
    );
        
}

export default TravelMgrLayout;
