import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { Container, Tooltip, IconButton} from "@mui/material";
import { createTheme , ThemeProvider  } from '@mui/material/styles';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import axios from 'axios';

const getMuiTheme = () =>
    createTheme({
        components: {
            MUIDataTableHeadCell: {
                styleOverrides:{ 
                    root: {
                    backgroundColor: 'rgb(129,202,242)',
                }}
            },
        },
        palette: {
            secondary: {
                main: '#9575cd',
            },
            primary:{
                main:'#81c784'
            }
        }
});

export const DataSettlement = () => {

    const [settlement, setSettlement] = useState( [] )

    const endpoint = 'https://hm-montajes.onrender.com/settlement/api/v1/settlements/'

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
                customBodyRender: (value) => {
                  const fechaFormateada = format(new Date(value), 'yyyy-MM-dd h:mm a');
                  return (
                    <span>{fechaFormateada}</span>
                  );
                },
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
                                <Link to={`/Liquidaciones/${settlement[dataIndex].id}`} ><VisibilityIcon color='secondary'/></Link>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Descargar">
                            <IconButton aria-label="download">
                                <FileDownloadIcon color="primary" />
                            </IconButton>
                        </Tooltip>               
                    </div>                  
                  );
                }
            }
        }
    ]
        
    const options = {
        filterType: 'checkbox',
        download:false,
        responsive:true,
        print:false,
        viewColumns:false,
        filter: false,
        selectableRows:false,
        tableBodyHeight:'75vh',
        elevation:10, 
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
            <Container maxWidth="xl" sx={{paddingTop: "15px"}} >                                    
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
