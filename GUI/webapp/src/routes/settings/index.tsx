import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Settings from '@/routes/settings/settings'

export const SettingsPage: FC = () => {
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