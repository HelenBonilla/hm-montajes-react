import { Button } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { AlertSnackbar } from '../common/AlertSnackbar'
import { useState } from 'react';
import { API_URL } from '../utils/constants';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProcessSettlement({id, fuctionSetter}) {
  const [loading, setLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("")
  const [severityAlert, setSeverityAlert] = useState("")

  const handleProcess = () => {
    setLoading(true);
    setMessageAlert("Procesando fichajes en liquidación");
    setSeverityAlert("info");
    setOpenAlert(true);
    axios.post(`${API_URL}/settlement/api/v1/process/`, {
        id: id,
    })
    .then(response => {
      setLoading(false);
      setMessageAlert("Liquidación procesada");
      setSeverityAlert("success");
      setOpenAlert(true);
      fuctionSetter(response.data);
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
