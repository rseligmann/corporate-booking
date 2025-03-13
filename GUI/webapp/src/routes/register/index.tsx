import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Register } from '@/features/auth/Register/Register';

export const RegisterPage: FC = () => {
    return (
        <>
            <Helmet>
                <title> Register | TravelPortal </title>
                <meta name="description" content="Register for a corporate travel account" />
            </Helmet>
            <Register />
        </>
    );
}