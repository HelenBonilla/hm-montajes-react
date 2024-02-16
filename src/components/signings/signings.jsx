import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Container,Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import ImportarArchivo from "./ImportarArchivo";


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


export const DataSignings = () => {

    const [workers, setWorkers] = useState( [] )

    const endpoint = 'https://hm-montajes.onrender.com/workers/api/v1/signings/'
    
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
                         <Tooltip title="Ver fichaje">
                            <IconButton aria-label="visibility">
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar fichaje">
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
        
    const options = { filterType: 'checkbox', responsive:true, filter: false, selectableRows:false, tableBodyHeight:440, elevation:10, 
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
    
        return(
            <ThemeProvider theme={getMuiTheme()}> 
                <Container maxWidth="xl" >
                    <div>
                        <ImportarArchivo/>

                        <MUIDataTable 
                            title="Lista de fichajes"
                            data={workers}
                            columns={columns}
                            options={options}
                        />  
                    </div>
                                                             
                </Container>
            </ThemeProvider>
        
        )

    
    
}
