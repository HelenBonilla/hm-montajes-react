import { blue, grey } from '@mui/material/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Dialog,  DialogActions, DialogContent, DialogTitle} from "@mui/material";
import * as React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useState} from "react";
import { IconButton } from "@mui/material";
import { API_URL } from '../utils/constants';
import { AlertSnackbar } from '../common/AlertSnackbar'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ImportarArchivo() {

  const [openModal, setOpenModal] = React.useState(false);
  const [archivos, setArchivos] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("")
  const [severityAlert, setSeverityAlert] = useState("")

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const subirArchivos = e => {
    setArchivos(e)
  }

  const importarArchivo = async() => {
    const formData = new FormData();
    formData.append("excel_file", archivos[0]);

    setLoading(true)
    setMessageAlert("Importando fichajes");
    setSeverityAlert("info");
    setOpenAlert(true);
    axios.post(`${API_URL}/workers/api/v1/import-signings/`, formData)
    .then(response=>{
        console.log(response.data)
        setLoading(false)
        setMessageAlert("Fichajes importados!");
        setSeverityAlert("success");
        setOpenAlert(false);
    }).catch(error=>{
        console.log(error)
        setLoading(false)
    })

    handleClose()
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpenAlert(false);
  };

  return (
    <>
      <Box sx={{paddingTop: "1px", my:1}}>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={loading ? <CircularProgress color="inherit"/> : <CloudUploadIcon />}>
          Importar fichaje
        </Button>
      </Box>

      <AlertSnackbar
        open={openAlert}
        onClose={handleCloseAlert}
        severity={severityAlert}
        message={messageAlert}
      />

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >           
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor:blue[300], color:grey[50]}} id="customized-dialog-title">
          Archivo
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: blue[800],
          }}
          >
            <CloseIcon />
        </IconButton>
        <DialogContent >
            <input type='file' onChange={(e)=>subirArchivos(e.target.files)}/>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={()=>importarArchivo()}>Importar</Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}
