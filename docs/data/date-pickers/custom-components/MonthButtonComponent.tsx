import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const CustomMonthButton = styled('button')({
  height: 36,
  width: 72,
});

export default function MonthButtonComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar']}>
        <DateCalendar
          slots={{ monthButton: CustomMonthButton }}
          views={['month', 'day']}
          openTo="month"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
