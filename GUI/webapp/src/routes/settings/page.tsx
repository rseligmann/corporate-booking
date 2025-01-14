import { Helmet } from 'react-helmet-async';
import Settings from '@/features/settings/settings'

function SettingsPage() {
  return (
    <>
      <Helmet>
        <title>Settings | TravelPortal</title>
        <meta name="description" content="Manage your travel preferences and guest types" />
      </Helmet>
      <Settings />
    </>
  );
}

export default SettingsPage;