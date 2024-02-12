import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { IconButton } from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';


const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableHeadCell: {
          styleOverrides:{ 
            root: {
            backgroundColor: 'rgb(129,202,242)',
          }}
        }
        
      }
});

export const DataSettlement = () => {

    const [settlement, setSettlement] = useState( [] )
    const endpoint = 'http://127.0.0.1:8000/settlement/api/v1/settlements/'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data
            setSettlement(data)
        })
    }

    useEffect( ()=>{
        getData()
    }, [])
        
    const columns = [
        {
            name: "start_date",
            label: "Fecha Inicio",
            options: {
                sort: true,
                customBodyRender: (value) => {
                  const fechaFormateada = format(new Date(value), 'yyyy-MM-dd h:mm a');
                  return (
                    <span>{fechaFormateada}</span>
                  );
                },
                customSort: (data1, data2) => {
                    // Función de orden personalizada para fechas por mes
                    const date1Parts = data1.split('/');
                    const date2Parts = data2.split('/');
                    const month1 = parseInt(date1Parts[1], 10);
                    const month2 = parseInt(date2Parts[1], 10);
                    return month1 - month2;
                }
            }
        },
        {
            name: "end_date",
            label: "Fecha Final",
            options: {
                customBodyRender: (value) => {
                  const fechaFormateada = format(new Date(value), 'yyyy-MM-dd h:mm a');
                  return (
                    <span>{fechaFormateada}</span>
                  );
                }
            }
        
        },
        {
            name:"action",
            label:"Acciones",
            options: {
                customBodyRenderLite: (dataIndex) => {
                  return (
                    <div>
                         <Tooltip title="Ver liquidación">
                            <IconButton aria-label="view">
                                <Link to={`/Liquidaciones/${settlement[dataIndex].id}`}><VisibilityIcon /></Link>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Descargar">
                            <IconButton aria-label="download">
                                <FileDownloadIcon />
                            </IconButton>
                        </Tooltip>               
                    </div>                  
                  );
                }
            }
        }
    ]
        
    const options = { filterType: 'checkbox', download:false, responsive:true, filter: false, selectableRows:false, tableBodyHeight:440, elevation:10, 
        textLabels: {    
            toolbar: {
                search: "Buscar fecha",
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
                delete: "Eliminar Liquidación",
            },
        
        },
    }
    
    return(
        <ThemeProvider theme={getMuiTheme()}> 
            <Container maxWidth="xl" >
                <MUIDataTable 
                    title="Lista de liquidaciones"
                    data={settlement}
                    columns={columns}
                    options={options}
                />                    
            </Container>
        </ThemeProvider>
        
    )
}
