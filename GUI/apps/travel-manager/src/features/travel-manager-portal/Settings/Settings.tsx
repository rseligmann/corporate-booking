import { useState } from 'react'
import { TravelMgrPageLayout } from '@/layouts'
import { SettingsNav } from './components/SettingsNav/SettingsNav';
import { BookingPreferences } from './components/BookingPreferences/BookPreferences'
import { PaymentMethods } from './components/PaymentMethods/PaymentMethods'
import { PreferredVendors } from './components/PreferredVendors/PreferredVendors'
import styles from './Settings.module.scss'

type SettingsSection = 'payment' | 'vendors' | 'booking';

const Settings = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('booking');

  const renderContent = () => {
    switch (activeSection) {
      case 'payment':
        return <PaymentMethods />;
      case 'vendors':
        return <PreferredVendors />;
      case 'booking':
        return <BookingPreferences />;
      default:
        return null;
    }
  };

  return (
    <TravelMgrPageLayout
      title="Settings"
      subtitle="Manage your travel settings"
    >
      <div className={styles.settingsLayout}>
        <div className={styles.settingsLayout__nav}>
          <SettingsNav 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
        
        <div className={styles.settingsLayout__content}>         
          {renderContent()}
        </div>
      </div>
    </TravelMgrPageLayout>
  );
};

export default Settings;