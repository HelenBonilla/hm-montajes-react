import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Tooltip, IconButton, Box} from "@mui/material";
import { createTheme , ThemeProvider  } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { handleExportExcel } from "../utils/handleExportExcel";
import { dateFormat } from "../utils/format";
import DateRangePicker from "../common/DateRangePicker";

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
            success:{
                main:'#81c784',
            }

        }
});

export const ListPayroll = () => {
    const [payrolls, setPayrolls] = useState([]);
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getPayrolls = async () => {
            try {
                const response = await axiosPrivate.get('/payroll/api/v1/payrolls/', {
                    signal: controller.signal
                });
                isMounted && setPayrolls(response.data);
            } catch (error) {
                console.error(error);
                // navigate('/auth/login', { state: { from: location }, replace: true });
            }
        }

        getPayrolls();

        return () => {
            isMounted = false;
            controller.abort();
        }
    })

    const columns = [
        {
            name: "payroll_date",
            label: "Fecha Nómina",
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
            name:"action",
            label:"Acciones",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <div>
                            <Tooltip title="Descargar">
                                <IconButton
                                    aria-label="download"
                                    onClick={() => handleExportExcel('/payroll/api/v1/export/', payrolls[dataIndex].id, axiosPrivate)}>
                                    <FileDownloadIcon color="success" />
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
        download: false,
        responsive: 'standard',
        print: false,
        viewColumns: false,
        filter: false,
        selectableRows: 'none',
        tableBodyHeight: '55vh',
        elevation: 10,
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
                <Box sx={{my:2}}>
                    <DateRangePicker color="primary"/>
                </Box>
                <MUIDataTable 
                    title="Lista de nóminas"
                    data={payrolls}
                    columns={columns}
                    options={options}
                />
            </Container>
        </ThemeProvider>
    )
}