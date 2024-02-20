import { Button } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { AlertSnackbar } from '../common/AlertSnackbar'
import { useState } from 'react';

export default function ProcessSettlement({id,fuctionSetter}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")

  const handleProcess = () => {
    setMessage("Procesando fichajes en liquidación");
    setSeverity("info");
    setOpen(true);
    axios.post('https://hm-montajes.onrender.com/settlement/api/v1/process/', {
        id: id,
    })
    .then(response => {
      setMessage("Liquidación procesada");
      setSeverity("success");
      setOpen(true);
      fuctionSetter(response.data)
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
};

  return (
    <Box sx={{paddingTop: "1px", mb:1}}>
        <Button variant="contained" onClick={handleProcess}>
            Procesar Liquidación
        </Button>
        <AlertSnackbar
            open={open}
            onClose={handleClose}
            severity={severity}
            message={message}
        />
    </Box>

  )
}
