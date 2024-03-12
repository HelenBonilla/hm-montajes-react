import { Button } from '@mui/material'
import { Box } from '@mui/system';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { handleExportExcel } from '../utils/handleExportExcel';

const ExportSettlement = ({id}) => {
    const axiosPrivate = useAxiosPrivate();

    return (
        <Box sx={{paddingTop: "1px", mb:1}}>
            <Button
                variant="contained"
                onClick={() => handleExportExcel('/settlement/api/v1/export/', id, axiosPrivate)}
                startIcon={<CloudDownloadIcon/>}
            >
            Exportar Liquidación 
            </Button>
        </Box>
    )
}

export default ExportSettlement;