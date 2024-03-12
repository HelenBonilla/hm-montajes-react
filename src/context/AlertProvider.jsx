import { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alertData, setAlertData] = useState({ open: false, severity: 'info', message: '' });

    const showAlert = (severity, message) => {
        setAlertData({ open: true, severity, message });
    };

    const hideAlert = () => {
        setAlertData({ ...alertData, open: false });
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
        {children}
        <Snackbar open={alertData.open} autoHideDuration={6000} onClose={hideAlert}>
            <Alert
                onClose={hideAlert}
                severity={alertData.severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {alertData.message}
            </Alert>
        </Snackbar>
        </AlertContext.Provider>
    );
}