import { IconButton } from '@mui/material'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { forwardRef, useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CircularProgress from '@mui/material/CircularProgress';
import { useAlert } from '../../hooks/useAlert';
import { handleExportExcel } from '../utils/handleExportExcel';

const ExportIconTable = forwardRef(({ id, ...props }, ref) => {
    const [loading, setLoading] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const { showAlert, hideAlert } = useAlert();
    const exportUrl = '/payroll/api/v1/export/';

    const handleExport = () => {
        showAlert("info", "Generando archivo, espere un momento")
        handleExportExcel(exportUrl, id, axiosPrivate, setLoading)        
    }

    return (
        <IconButton
            aria-label="download"
            onClick={() => handleExport()}
            {...props}
            ref={ref}
        >
            {loading ? <CircularProgress color="inherit" size={20}/> : <FileDownloadIcon color="success"/>}
        </IconButton>
    )
});

ExportIconTable.displayName = 'ExportIconTable'

export default ExportIconTable