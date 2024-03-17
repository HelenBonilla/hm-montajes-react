import { forwardRef, useState } from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useAlert } from '../../hooks/useAlert';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const DeleteButtonTable = forwardRef(({ id, setPayrolls, ...props }, ref) => {
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();
    const axiosPrivate = useAxiosPrivate();

    const handleDelete = async () => {
        try {
            setLoading(true);
            showAlert("info", `Eliminando nómina, espere un momento`)
            const response = await axiosPrivate.delete(`/payroll/api/v1/payrolls/${id}/`)
            setLoading(false);
            showAlert("info", `Nómina eliminada con éxito`)
            setPayrolls((payrolls) => {
                return payrolls.filter(payroll => payroll.id !== id)
            })
        } catch (error) {
            showAlert("error", `Error eliminando la nómina ${error}`)
        }
    }

    return (
        <IconButton
                aria-label="delete"
                onClick={() => handleDelete()}
                {...props}
                ref={ref}
            >
                {loading ? <CircularProgress color="inherit" size={20}/> : <DeleteIcon color="error"/>}
        </IconButton>
    )
})

DeleteButtonTable.displayName = 'DeleteButtonTable'