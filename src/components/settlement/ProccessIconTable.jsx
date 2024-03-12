import { Button, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircularProgress from '@mui/material/CircularProgress';
import { useAlert } from '../../hooks/useAlert';

export default function ProcessIconTable({id, fuctionSetter}) {
    const [loading, setLoading] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const { showAlert } = useAlert();

    const handleProcess = () => {
        setLoading(true);
        showAlert("warning", "Procesando fichajes en liquidación");
        axiosPrivate.post('/settlement/api/v1/process/', {
            id: id,
        }).then(response => {
            setLoading(false);
            showAlert("success", "Liquidación procesada");
            fuctionSetter(response.data);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        })
    }

    return (
        <IconButton
        variant="contained"
        onClick={handleProcess}
        color="primary"
        >
            {loading ? <CircularProgress color="inherit" size={20}/> : <AccessTimeIcon/>}
        </IconButton>
    )
}
