import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/es';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function DatePayroll({setFechaNomina, fechaNomina}) {
    const [locale] = React.useState('es');

    function setDate (date) {
        date = format(new Date(date), 'yyyy-MM-dd', {locale: es})   
        setFechaNomina(date) 
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <DemoContainer components={['DatePicker']} >
                <DatePicker label="Fecha de inicio"  value={fechaNomina} onChange={(newFecha) => setDate(newFecha) } />
            </DemoContainer>
        </LocalizationProvider>
    );
}