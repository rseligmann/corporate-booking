import { useState } from 'react'
import { Save } from 'lucide-react'
import { Alert } from "@/components/Alert/alert"
import { Button } from "@mantine/core"
import { TravelMgrPageLayout } from '@/layouts'
import { SettingsNav } from './components/SettingsNav/SettingsNav';
import { BookingPreferences } from './components/BookingPreferences/BookPreferences'
import { PaymentMethods } from './components/PaymentMethods/PaymentMethods'
import { PreferredVendors } from './components/PreferredVendors/PreferredVendors'
import styles from './Settings.module.scss'

type SettingsSection = 'payment' | 'vendors' | 'booking';

const Settings = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('booking');
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const handleSave = () => {
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const actionButton = (
    <Button
      onClick={handleSave}
      variant="filled"
      className="settings__save-button"
      leftSection={<Save size={14} />}
    >
      <span>Save Changes</span>
    </Button>
  );

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
      action={actionButton}
    >
      <div className={styles.settingsLayout}>
        <div className={styles.settingsLayout__nav}>
          <SettingsNav 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
        
        <div className={styles.settingsLayout__content}>
          {showSaveAlert && (
            <Alert 
              variant="success"
              className="settings__alert"
            >
              Settings saved successfully!
            </Alert>
          )}
          
          {renderContent()}
        </div>
      </div>
    </TravelMgrPageLayout>
  );
};

export default Settings;