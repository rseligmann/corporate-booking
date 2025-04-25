import { useEffect, useState } from 'react'
import { Card, Divider, Grid, Space, Text } from '@mantine/core'
import { Plane, Building2, Car, Receipt, HelpCircle } from 'lucide-react';
import { Trip } from '@corporate-travel-frontend/types';
import classes from './IntroCard.module.scss'

interface IntroCardProps{
    firstName: string;
    lastName: string;
    tripsData: [Trip] | undefined;
}

export const IntroCard: React.FC<IntroCardProps> = ({firstName, lastName, tripsData}) => {

    const [ introMessage, setIntroMessage ] = useState('')

    useEffect(() =>{
        if(tripsData && tripsData[0].itinerary.startDate && tripsData[0].itinerary.endDate) {
        
            const startDate = new Date(tripsData[0].itinerary.startDate)
            const endDate = new Date(tripsData[0].itinerary.endDate)
            const today = new Date();

            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            const diffTime = Math.abs(today.getTime() - startDate?.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

            if (startDate > today)
                setIntroMessage(`${diffDays} days until your trip`)

            if(startDate <= today && endDate >= today)
                setIntroMessage('Safe travels!')

            if(endDate < today)
                setIntroMessage('Trip complete!')
        }  
    },[tripsData]);
    

    return(
        <Card className={classes.introCard}>
            <div>
                <Text className={classes.welcomeInfo__headerText}>
                    {`Welcome, ${firstName} ${lastName}`}
                </Text>
                <Text c='blue' className={classes.welcomeInfo__text}>
                    {introMessage}
                </Text>
                <Text className={classes.welcomeInfo__text}>
                    This is your personal dashboard for managing all aspects of your upcoming visit. Here's what you can do:
                </Text>
            </div>
            <Space h='lg'/>
            <Grid>
                <Grid.Col span={{base: 12, md: 6, lg: 3}} className={classes.feature}>
                    <Plane className={classes.featureIcon}/>
                    <Text>Book flights</Text>
                </Grid.Col>
                <Grid.Col span={{base: 12, md: 6, lg: 3}} className={classes.feature}>
                    <Building2 className={classes.featureIcon}/>
                    <Text>Book hotel</Text>
                </Grid.Col>
                <Grid.Col span={{base: 12, md: 6, lg: 3}} className={classes.feature}>
                    <Car className={classes.featureIcon}/>
                    <Text>Set up ground transport</Text>
                </Grid.Col>
                <Grid.Col span={{base: 12, md: 6, lg: 3}} className={classes.feature}>
                    <Receipt className={classes.featureIcon}/>
                    <Text>Submit travel expenses</Text>
                </Grid.Col>
            </Grid>

            <Space h='md'/>
            <Divider/>
            <Space h='md'/>

            <div className={classes.feature}>
                <HelpCircle  className={classes.helpIcon} />
                <Text c='dimmed' size='sm'>Need help? Contact your travel coordinator or click the support button in the top right corner</Text>
            </div>
        </Card>
    )
}