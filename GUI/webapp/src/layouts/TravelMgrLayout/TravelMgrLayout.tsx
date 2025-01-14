import React from 'react';
import { Outlet } from 'react-router-dom';
import '.../layouts/TravelMgrLayout/layout.scss';
import "./globals.scss";
import { RequireAuth } from '@/features/auth/RequireAuth';


const TravelMgrLayout: React.FC = () => {
    return (
        <RequireAuth>
            <div className="root-layout">
                <Outlet />
            </div>
        </RequireAuth>
    );
        
}

export default TravelMgrLayout;
