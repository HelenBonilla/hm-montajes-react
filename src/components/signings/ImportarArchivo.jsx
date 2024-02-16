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

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const subirArchivos=e=>{
    setArchivos(e)
}

const importarArchivo=async()=>{
    const f = new FormData();

    for (let index = 0; index < archivos[index]; index++) {
        f.append("files", archivos[index]);          
    }

    await axios.post("https://hm-montajes.onrender.com/workers/api/v1/import-signings/",f)
    .then(response=>{
        console.log(response.data)
    }).catch(error=>{
        console.log(error)
    })

    handleClose()
    {<CircularProgress />}

}

  return (
    <>
      <Box sx={{paddingTop: "1px", m:1}}>
        <Button variant="contained" onClick={handleClickOpen} startIcon={<CloudUploadIcon />}>
          Importar fichaje
        </Button>
      </Box>

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
