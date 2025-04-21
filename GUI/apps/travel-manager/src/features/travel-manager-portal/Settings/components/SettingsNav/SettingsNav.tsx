import { Card, Divider, NavLink, Text } from '@mantine/core';
import { CreditCard, Handshake, Hotel } from 'lucide-react';

type SettingsSection = 'payment' | 'vendors' | 'booking';

interface SettingsNavProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}


const data = [
    {
        icon: CreditCard,
        label: "Payment Methods",
        value: 'payment' as SettingsSection
    },
    {
        icon: Handshake,
        label: "Preffered Vendors",
        value: 'vendors' as SettingsSection
    },
    {
        icon: Hotel,
        label: "Booking Preferences",
        value: 'booking' as SettingsSection
    }

];

export const SettingsNav = ({ activeSection, onSectionChange }: SettingsNavProps) => {

    const items = data.map((item) => (
        <NavLink 
            key={item.label}
            label={item.label}
            leftSection={<item.icon size={15} strokeWidth={1.5} />}
            active={item.value === activeSection}
            onClick={() => onSectionChange(item.value)}
            variant = "filled"
        />
    ));


    return (
        <Card shadow="xs" padding="xs" radius="md" withBorder>
            <Text size="sm" fw={700}>Travel</Text>
            <Divider my="xs" />
        {items}
        </Card>
    );
}