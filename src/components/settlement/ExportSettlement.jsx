import { Button } from '@mui/material'
import { Box } from '@mui/system';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export const handleExport = (id, axiosClient) => {
    axiosClient.post('/settlement/api/v1/export/', {
        id:id,
    },
    {
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const disposition = response.request.getResponseHeader('Content-Disposition');
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        const filename = matches && matches.length > 1 ? matches[1].replace(/['"]/g, '') : 'archivo.xlsx'; // Default filename
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // File name
        document.body.appendChild(link);
        link.click();
    })
}

const ExportSettlement = ({id}) => {
    const axiosPrivate = useAxiosPrivate();

    return (
        <Box sx={{paddingTop: "1px", mb:1}}>
            <Button
                variant="contained"
                onClick={() => handleExport(id, axiosPrivate)}
                startIcon={<CloudDownloadIcon/>}
            >
            Exportar Liquidación 
            </Button>
        </Box>
    )
}

export default ExportSettlement;