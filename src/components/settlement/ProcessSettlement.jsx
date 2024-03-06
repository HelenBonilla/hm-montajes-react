import { Button } from '@mui/material'
import { Box } from '@mui/system'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AlertSnackbar } from '../common/AlertSnackbar'
import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProcessSettlement({id, fuctionSetter}) {
    const [loading, setLoading] = useState(false)
    const [openAlert, setOpenAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState("")
    const [severityAlert, setSeverityAlert] = useState("")
    const axiosPrivate = useAxiosPrivate();

    const handleProcess = () => {
        setLoading(true);
        setMessageAlert("Procesando fichajes en liquidación");
        setSeverityAlert("warning");
        setOpenAlert(true);
        axiosPrivate.post('/settlement/api/v1/process/', {
            id: id,
        }).then(response => {
            setLoading(false);
            setMessageAlert("Liquidación procesada");
            setSeverityAlert("success");
            setOpenAlert(true);
            fuctionSetter(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    return (
        <Box sx={{paddingTop: "1px", mb:1}}>
            <Button
            variant="contained"
            onClick={handleProcess}
            startIcon={loading ? <CircularProgress color="inherit" size={20}/> : <AccessTimeIcon/>}
            >
                Procesar Liquidación
            </Button>
            <AlertSnackbar
                open={openAlert}
                onClose={handleClose}
                severity={severityAlert}
                message={messageAlert}
            />
        </Box>
    )
}
