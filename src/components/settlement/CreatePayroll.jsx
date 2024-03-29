import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DatePayroll from '../common/DatePayroll';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAlert } from '../../hooks/useAlert';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CreatePayroll({settlementSelected}) {
    const [open, setOpen] = React.useState(false);
    const [fechaNomina, setFechaNomina] = React.useState("");
    const axiosPrivate = useAxiosPrivate();
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate =() =>{
        showAlert("info", "Creando nómina, espere un momento")
        axiosPrivate.post('/payroll/api/v1/create/', {
            settlements:settlementSelected,
            payroll_date:fechaNomina
        }).then(response => {
            showAlert("success", "Nómina creada con éxito!")
            navigate('/nomina', { state: { from: location }, replace: true });
        }).catch(error => {
            showAlert("success", `Error al crear la nómina: ${error}`)
        })
        handleClose()
    }
    const handleClickOpen = () => {
        setOpen(true);
    }

  return (
    <Box sx={{paddingTop: "1px", mb:1}}>
        <Button
        variant="contained"
        onClick={() => handleClickOpen()}
        startIcon={<AddCircleIcon/>}
        >
            Crear Nomina
        </Button>

        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Crear Nomina
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers >
                <DatePayroll setFechaNomina={setFechaNomina} fechaNomina={fechaNomina}/>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCreate}>
                    Guardar
                </Button>
            </DialogActions>
        </BootstrapDialog>
    </Box>
  )
}
