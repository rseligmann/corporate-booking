export const getDaysDifference = (startDate: Date | null, endDate: Date | null) => {
    
    if (startDate && endDate){
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Reset the time part to midnight (00:00:00)
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        
        // Calculate the difference in days and add 1 to include both the start and end dates
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        return diffDays;
    }else{
        return 0
    }
    
}
