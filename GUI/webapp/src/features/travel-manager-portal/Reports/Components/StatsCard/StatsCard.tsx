import React from 'react';
import { Card, Group, Text } from '@mantine/core';

interface StatsCardProps {
    cardTitle: string;
    stat: string;
    statDetail: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({cardTitle, stat, statDetail}) => {
    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <Card.Section inheritPadding>
            <Group justify="space-between" mt="md" mb="xs">
                <Text size ="lg" fw={500} c="dimmed">{cardTitle}</Text>
            </Group>
            </Card.Section>
            <Text size = "xl" fw={700}>
                {stat}
            </Text>
            <Text size="sm" c={cardTitle === "Requires Attention" ? "orange" : "dimmed"}>
                {statDetail}
            </Text>

        </Card>
    )
}