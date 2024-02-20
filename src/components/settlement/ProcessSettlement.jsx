import { Button } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { AlertSnackbar } from '../common/AlertSnackbar'
import { useState } from 'react';
import { API_URL } from '../utils/constants';

export default function ProcessSettlement({id,fuctionSetter}) {
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("")
  const [severityAlert, setSeverityAlert] = useState("")

  const handleProcess = () => {
    setMessageAlert("Procesando fichajes en liquidación");
    setSeverityAlert("info");
    setOpenAlert(true);
    axios.post(`${API_URL}/settlement/api/v1/process/`, {
        id: id,
    })
    .then(response => {
      setMessageAlert("Liquidación procesada");
      setSeverityAlert("success");
      setOpenAlert(true);
      fuctionSetter(response.data)
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
        <Button variant="contained" onClick={handleProcess}>
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
