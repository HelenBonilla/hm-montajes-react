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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState(0);
    const [searchText, setSearchText] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const getSignings = async () => {
            try {
                // Fix when searchText becomes null
                const searchParam = searchText ? searchText : '';
                const response = await axiosPrivate.get(`/workers/api/v1/signings/?page=${page + 1}&page_size=${rowsPerPage}&search=${searchParam}`);
                setSignings(response.data.results);
                setCount(response.data.count);
            } catch (error) {
                console.error(error);
                // navigate('/auth/login', { state: { from: location }, replace: true });
            }
        }

        getSignings()
    }, [page, rowsPerPage, searchText])

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(parseInt(newRowsPerPage, 10));
        setPage(0); // Reset page to 0 when rows per page changes
    };

    const handleSearchChange = (searchQuery) => {
        setSearchText(searchQuery);
    };

    const columns = [
        {
            name: "folder_number",
            label: "Legajo"
        },
        {
            name: "worker_info.name",
            label: "Trabajador",
        },
        {
            name: "worker_info.document",
            label: "Documento",
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
        serverSide: true,
        page: page,
        count: count,
        filterType: 'checkbox',
        responsive: 'standard',
        filter: false,
        selectableRows: 'none',
        tableBodyHeight: '55vh',
        rowsPerPage: rowsPerPage,
        rowsPerPageOptions: [10, 25, 50, 100],
        onChangePage: handlePageChange,
        onChangeRowsPerPage: handleRowsPerPageChange,
        onSearchChange: handleSearchChange,
        elevation: 10,
        fixedHeader: true,
        enableNestedDataAccess: ".",
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
