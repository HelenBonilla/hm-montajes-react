import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { ThemeProvider, createTheme } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { API_URL } from '../utils/constants';
import { es } from 'date-fns/locale';


const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableHeadCell: {
          styleOverrides:{ 
            root: {
            backgroundColor: '#81d4fa',
          }}
        }
        
      }
});


export default function ViewWorkers() {
  const { id } = useParams();
  const [ worker, setWorker ] = useState({});
  const endpoint = `${API_URL}/workers/api/v1/workers/${id}/`;


  const getData = async () => {
    await axios.get(endpoint).then((response) => {
      const data = response.data
      console.log(data)
      setWorker(data)
    })
  }

  useEffect(()=>{
    getData()
  },[]) 

  const columns = [
    {
        name: "id",
        label: "id"
    },
    {
        name: "folder_number",
        label: "Legajo"
    },
    {
        name: "date_signed",
        label: "Fecha Fichada",
        options: {
            customBodyRender: (value) => {
              const fechaFormateada = format(new Date(value), 'dd/MMM/yyyy h:mm a', {locale: es});
              return (
                <span>{fechaFormateada}</span>
              );
            }
        }
    },
    {
        name: "normalized_date_signed",
        label: "Fecha Normalizada",
        options: {
            customBodyRender: (value) => {
              const fechaFormateada = format(new Date(value), 'dd/MMM/yyyy h:mm a', {locale: es});
              return (
                <span>{fechaFormateada}</span>
              );
            }
        }
    },
    {
        name: "signed_type",
        label: "Tipo",
        options: {
            customBodyRender: (value) => {
                return (
                    <span>{value === 'E' ? 'Entrada': 'Salida'}</span>
                );
            }
        }
    },
    {
        name: "door",
        label: "Puerta"
    },
    {
        name: "contract_number",
        label: "Número de contrato"
    },
]
    
const options = {
    filterType: 'checkbox',
    responsive: true,
    filter: false,
    selectableRows: false,
    tableBodyHeight: 440,
    elevation: 10, 
    textLabels: {    
        toolbar: {
            search: "Buscar fichaje",
            downloadCsv: "Descargar Excel",
            print: "Imprimir lista",
            viewColumns: "Ver Columnas",
        },
        pagination: {
            next: "Siguiente Página",
            previous: "Página anterior",
            rowsPerPage: "Filas por páginas:",
        },
        body: {
            noMatch: "Lo sentimos, no se encontraron registros coincidentes",
            columnHeaderTooltip: column => `${column.label}`
        },
        selectedRows: {
            text: "Columnas seleccionadas",
            delete: "Eliminar fichaje",
            deleteAria: "Delete Selected Rows",
        },
    
    },
}


  return (
    <ThemeProvider theme={getMuiTheme()}>
        <Container maxWidth="xl">
            <Box sx={{py: "1px", my: 2}}>
              <h2>{worker.name}</h2>
              <h3>{worker.document}</h3>
            </Box>
            <MUIDataTable 
                title="Lista de fichajes"
                data={worker.signings}
                columns={columns}
                options={options}
            />
        </Container>
    </ThemeProvider>
)
}
