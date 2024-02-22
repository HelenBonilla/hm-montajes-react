import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MinimizeIcon from '@mui/icons-material/Minimize';
import 'dayjs/locale/es';

export default function DateRangePicker() {
    const [locale, setLocale] = React.useState('es');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <DemoContainer components={['DatePicker']} >
                <DatePicker label="Fecha de inicio"  />
                    <MinimizeIcon color="primary"/>
                <DatePicker label="Fecha de final" />
            </DemoContainer>
        </LocalizationProvider>
    );
}