import { Card, Divider, NavLink, Text } from '@mantine/core';
import { CreditCard, Handshake, Hotel } from 'lucide-react';
import { useState } from 'react';

const data = [
    {
        icon: CreditCard,
        label: "Payment Methods",
        href: "/settings"
    },
    {
        icon: Handshake,
        label: "Preffered Vendors",
        href: "/settings"
    },
    {
        icon: Hotel,
        label: "Booking Preferences",
        href: "/settings"
    }

];

export const SettingsNav = () => {
    const [active, setActive] = useState(2);

    const items = data.map((item, index) => (
        <NavLink 
            key={item.label}
            href={item.href}
            label={item.label}
            leftSection={<item.icon size={15} strokeWidth={1.5} />}
            active={index === active}
            onClick={() => setActive(index)}
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