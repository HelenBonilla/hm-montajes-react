import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import { Link } from "react-router-dom";

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
        },
        palette: {
            secondary: {
                main: '#e57373',
            }, 
            primary:{
                main: '#9575cd',
            }
        }
});

export const DataWorker = () => {
    const [workers, setWorkers] = useState( [] )
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getWorkers = async () => {
            try {
                const response = await axiosPrivate.get('/workers/api/v1/workers/', {
                    signal: controller.signal
                });
                isMounted && setWorkers(response.data);
            } catch (error) {
                console.error(error);
                // navigate('/auth/login', { state: { from: location }, replace: true });
            }
        }

        getWorkers();

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
                customBodyRenderLite: (dataIndex) => {
                  return (
                    <div>
                         <Tooltip title="Ver trabajador">
                            <IconButton aria-label="visibility">
                                <Link to={`/trabajadores/${workers[dataIndex].id}`} >
                                    <VisibilityIcon color='primary'/>
                                </Link>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar trabajador">
                            <IconButton aria-label="delete">
                                <DeleteIcon color="secondary"/>
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
        responsive: 'standard',
        filter: false,
        selectableRows: 'none',
        tableBodyHeight:'75vh',
        elevation:10,
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
