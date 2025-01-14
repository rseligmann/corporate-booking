import React from 'react';
import '.../layouts/TravelMgrLayout/layout.scss';
import "./globals.scss";

interface LayoutProps {
    children: React.ReactNode;
}

export const TravelMgrLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="root-layout">
            {children}
        </div>
    );
}

export default TravelMgrLayout;
