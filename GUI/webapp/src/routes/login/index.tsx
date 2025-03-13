import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Login } from '@/features/auth/Login/Login';

export const LoginPage: FC = () => {
    return (
        <>
            <Helmet>
                <title> Login | TravelPortal </title>
                <meta name="description" content="Login to your corporate travel account" />
            </Helmet>
            <Login />
        </>
    );
}