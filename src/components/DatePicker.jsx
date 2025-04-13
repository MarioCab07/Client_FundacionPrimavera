import * as React from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const DatePickerValue = ({date,setDate}) => {
    
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               
                
                <DatePicker
                    label="Fecha"
                    value={date} 
                    onChange={(newValue) => {
                        
                        if (newValue) {
                            setDate(newValue);
                            
                        }
                    }}
                />
            </div>
        </LocalizationProvider>
    );
};

export default DatePickerValue;