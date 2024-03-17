import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useAlert } from '../../hooks/useAlert';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteSignings = ({ setSignings }) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const AxiosPrivate = useAxiosPrivate()
    const { showAlert } = useAlert()

    const handleDelete = async () => {
        handleClose()
        setLoading(true)
        showAlert("info", "Eliminando fichajes, espere un momento")
        const response = await AxiosPrivate.delete('/workers/api/v1/signings/delete_all/')
        setLoading(false)
        showAlert("success", "Todos los fichajes han sido eliminados correctamente")
        setSignings([])
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{my: 1}}>
            <Button
                variant="contained"
                color="error"
                onClick={handleClickOpen}
                startIcon={loading ? <CircularProgress color="inherit" size={20}/> : <DeleteIcon/>}>
                Eliminar Todos los fichajes
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="Eliminar todos los fichajes"
            >
                <DialogTitle>
                    ¿Seguro que quiere eliminar todos los fichajes?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDelete} color='success' variant='contained'>SI</Button>
                    <Button onClick={handleClose} color='error' variant='contained'>NO</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
