import { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MinimizeIcon from '@mui/icons-material/Minimize';
import { Box, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import 'dayjs/locale/es';
import { format } from 'date-fns';

export default function DateRangePicker({ onChange }) {
    const [locale, setLocale] = useState('es');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (startDate && endDate) {
            const newStartDate = startDate ? format(new Date(startDate), 'yyyy-MM-dd') : ''
            const newEndDate = endDate ? format(new Date(endDate), 'yyyy-MM-dd') : ''
            const newRange = { startDate: newStartDate, endDate: newEndDate }
            onChange(newRange);
        } else {
            const emptyRange = {}
            onChange(emptyRange)
        }

    }, [startDate, endDate]);

    const handleClearDates = () => {
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <DemoContainer components={['DatePicker']} >
                <DatePicker
                    label="Fecha de inicio"
                    value={startDate}
                    onChange={(newValue) => {
                        setStartDate(newValue);
                    }}
                />
                    <MinimizeIcon color="primary"/>
                <DatePicker
                    label="Fecha de final"
                    value={endDate}
                    onChange={(newValue) => {
                        setEndDate(newValue);
                    }}
                />
                <Box ml={1}>
                    <IconButton onClick={handleClearDates} aria-label="Clear Dates">
                        <ClearIcon />
                    </IconButton>
                </Box>
            </DemoContainer>
        </LocalizationProvider>
    );
}