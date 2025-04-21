import { CloseButton } from "@mantine/core";
import { SearchServiceableAirportsResponse } from "@/types";
import classes from './AirportPill.module.scss'
import React from "react";

interface AirportPillProps {
     airportData: SearchServiceableAirportsResponse
     onRemove?: () => void;
}

export const AirportPill: React.FC<AirportPillProps> = ({airportData, onRemove}) => {
     return (
          <div className={classes.pill}>
            <div className={classes.label}>
              {`${airportData.iata} - ${airportData.airport_name}`}
            </div>
            <div className={classes.distance}>
               {`${Math.round(airportData.distance_miles)}mi`}
          </div>
            <CloseButton
              onMouseDown={onRemove}
              variant="transparent"
              color="gray"
              size={22}
              iconSize={14}
              tabIndex={-1}
            />
          </div>
        );
}