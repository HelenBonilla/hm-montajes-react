import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Box, Card, Container } from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import ImportarArchivo from "./ImportarArchivo";
import { dateFormat } from "../utils/format";
import DateRangePicker from "../common/DateRangePicker";

const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableHeadCell: {
            styleOverrides:{ 
                root: {
                    backgroundColor: '#81d4fa',
                }
            }
        }
        
      }
});


export const DataSignings = () => {

    const [signings, setSignings] = useState( [] )
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    const getSignings = async () => {
        try {
            const response = await axiosPrivate.get(`/workers/api/v1/signings/?page=${currentPage}`);
            const data = response.data.results
            setSignings((prevData) => [...prevData, ...data]);
        } catch (error) {
            console.error(error);
            // navigate('/auth/login', { state: { from: location }, replace: true });
        }
    }

    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage);
    };

    useEffect(() => {
        getSignings()
    }, [])

    useEffect(() => {
        getSignings()
    }, [currentPage])

    const columns = [
        {
            name: "folder_number",
            label: "Legajo"
        },
        {
            name: "worker_info",
            label: "Trabajador",
            options: {
                customBodyRender: (value) => {
                    return (
                      <span>{value.name}</span>
                    );
                },
            }
        },
        {
            name: "worker_info",
            label: "Documento",
            options: {
                customBodyRender: (value) => {
                    return (
                        <span>{value.document}</span>
                    );
                }
            }
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
            label: "# contrato"
        },
    ]

    const options = {
        filterType: 'checkbox',
        responsive: 'standard',
        filter: false,
        selectableRows: 'none',
        tableBodyHeight: '55vh',
        rowsPerPage: 50,
        rowsPerPageOptions:false,
        elevation: 10,
        fixedHeader: true,
        onChangePage: handlePageChange,
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
            <Container maxWidth="lg">
                <Box sx={{ my: 2 }} >
                    <ImportarArchivo setSignings={setSignings}/>
                    <DateRangePicker/>
                </Box>
                <MUIDataTable
                    title="Lista de fichajes"
                    data={signings}
                    columns={columns}
                    options={options}
                />
            </Container>
        </ThemeProvider>
    )
}
