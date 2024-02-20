import { Button } from '@mui/material'
import { Box } from '@mui/system';
import axios from 'axios';


export default function ExportSettlement({id}) {  
    const handleExport = () => {
        axios.post('https://hm-montajes.onrender.com/settlement/api/v1/export/', {
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


  return (
    <Box sx={{paddingTop: "1px", mb:1}}>
        <Button variant="contained" onClick={handleExport}>
        Exportar Liquidación 
        </Button>
    </Box>
  )
}
