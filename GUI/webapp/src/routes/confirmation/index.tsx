import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { ConfirmSignup} from '@/features/auth/ConfirmSignup/ConfirmSignup';

export const ConfirmationPage: FC = () => {
    return (
        <>
            <Helmet>
                <title> Confirm Signup | TravelPortal </title>
                <meta name="description" content="Confirm your corporate travel account" />
            </Helmet>
            <ConfirmSignup />
        </>
    );
}