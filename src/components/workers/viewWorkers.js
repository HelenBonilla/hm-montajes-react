import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ThemeProvider, createTheme } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { dateFormat } from '../utils/format';

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
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getWorker = async () => {
      try {
        const response = await axiosPrivate.get(`/workers/api/v1/workers/${id}/`, {
          signal: controller.signal
        });
        isMounted && setWorker(response.data);
      } catch (error) {
        console.error(error);
        // navigate('/auth/login', { state: { from: location }, replace: true });
      }
    }

    getWorker();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

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
              const fechaFormateada = dateFormat(value)
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
              const fechaFormateada = dateFormat(value)
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
    responsive: 'standard',
    filter: false,
    selectableRows: 'none',
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
