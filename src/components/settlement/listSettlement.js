import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Tooltip, IconButton} from "@mui/material";
import { createTheme , ThemeProvider  } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { handleExport } from "./ExportSettlement";
import { dateFormat } from "../utils/format";

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
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getSettlements = async () => {
            try {
                const response = await axiosPrivate.get('/settlement/api/v1/settlements/', {
                    signal: controller.signal
                });
                isMounted && setSettlement(response.data);
            } catch (error) {
                console.error(error);
                // navigate('/auth/login', { state: { from: location }, replace: true });
            }
        }

        getSettlements();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const columns = [
        {
            name: "start_date",
            label: "Fecha Inicio",
            options: {
                customBodyRender: (value) => {
                    const fechaFormateada = dateFormat(value)
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
                    const fechaFormateada = dateFormat(value)
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
                                <Link to={`/liquidaciones/${settlement[dataIndex].id}`} ><VisibilityIcon color='secondary'/></Link>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Descargar">
                            <IconButton aria-label="download" onClick={() => handleExport(settlement[dataIndex].id)}>
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
        responsive: 'standard',
        print:false,
        viewColumns:false,
        filter: false,
        selectableRows: 'none',
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
