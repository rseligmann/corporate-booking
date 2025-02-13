import React from 'react';
import { Card, Group, Text } from '@mantine/core';
import { LucideIcon } from 'lucide-react';
import './StatsCard.module.scss';

interface StatsCardProps {
    cardTitle: string;
    icon: LucideIcon;
    guestCount: number;
    quickStat: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({cardTitle, icon: Icon, guestCount, quickStat}) => {
    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <Card.Section inheritPadding>
            <Group justify="space-between" mt="md" mb="xs">
                <Text size ="lg" fw={700}>{cardTitle}</Text>
                <Icon size = {16} className={cardTitle === "Requires Attention" ? "stats-card__icon--warning" : "stats-card__icon"} />
            </Group>
            </Card.Section>
            <Text size = "xl" fw={700}>
                {guestCount}
            </Text>
            <Text size="sm" c={cardTitle === "Requires Attention" ? "orange" : "dimmed"}>
                {quickStat}
            </Text>

        </Card>
    )
}