import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import GuestInvite from '@/routes/guestinvite/GuestInvite'

export const GuestInvitePage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Invite Guest | TravelPortal</title>
        <meta name="description" content="Invite a new guest for corporate travel" />
      </Helmet>
      <GuestInvite />
    </>
  );
}

export default GuestInvitePage;