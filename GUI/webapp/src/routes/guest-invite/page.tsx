import { Helmet } from 'react-helmet-async';
import GuestInvite from '@/features/guest-invite/guest-invite-form'

function GuestInvitePage() {
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