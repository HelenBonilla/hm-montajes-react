import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';

const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableHeadCell: {
          styleOverrides:{ 
            root: {
            backgroundColor: 'rgb(129,202,242)',
          }}
        },
        MUIDataTable: {
            responsiveScroll: {
                maxHeight: '100%',
            },
        },
      }
});

export const DataWorker = () => {

    const [workers, setWorkers] = useState( [] )
    const endpoint = 'http://127.0.0.1:8000/workers/api/v1/workers/'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data
            console.log(data)
            setWorkers(data)
        })
    }

    useEffect( ()=>{
        getData()
    }, [])
        
    const columns = [
        {
            name: "id",
            label: "id"
        },
        {
            name: "name",
            label: "Nombre completo"
        },
        {
            name: "document",
            label: "Documento"
        },
        {
            name:"action",
            label:"Acciones",
            options: {
                customBodyRender: () => {
                  return (
                    <div>
                         <Tooltip title="Ver trabajador">
                            <IconButton aria-label="visibility">
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar trabajador">
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>               
                    </div>                  
                  );
                }
            }
        }
    ]

    const options = { filterType: 'checkbox', responsive:true, filter: false, selectableRows:false, print:false, tableBodyHeight:'75vh', elevation:10, 
        textLabels: {    
            toolbar: {
                search: "Buscar Trabajador",
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
                delete: "Eliminar trabajador",
                deleteAria: "Delete Selected Rows",
            },
        
        },
    }
    
    return(
        <ThemeProvider theme={getMuiTheme()}> 
            <Container maxWidth="xl" sx={{paddingTop: "15px"}} >
                    <MUIDataTable 
                        title="Lista de trabajadores"
                        data={workers}
                        columns={columns}
                        options={options}
                    />                    
            </Container>
        </ThemeProvider>
    
    )
}
