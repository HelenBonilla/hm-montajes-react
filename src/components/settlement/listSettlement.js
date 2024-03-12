import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Tooltip, IconButton, Box, Grid, Button} from "@mui/material";
import { createTheme , ThemeProvider  } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ExportSettlement from "./ExportSettlement";
import { handleExportExcel } from "../utils/handleExportExcel";
import { dateFormat } from "../utils/format";
import DateRangePicker from "../common/DateRangePicker";
import ProccessIconTable from "./ProccessIconTable";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as React from 'react';
import CreatePayroll from "./CreatePayroll";

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

export const DataSettlement = () => {
    const [settlement, setSettlement] = useState( [] )
    const [settlementSelected, setSettlementSelected] = useState( [] )
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const updateSettlementElement = (settlement) => {
        setSettlement((prev) => {
            for (let index = 0; index < prev.length; index++) {
                if (prev[index].id === settlement.id) {
                    prev[index] = {...settlement}
                }
            }
            return [...prev];
        })

    }

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
                            <IconButton aria-label="view" component={Link} to={`/liquidaciones/${settlement[dataIndex].id}`}>
                                <VisibilityIcon color='secondary'/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Procesar liquidación">
                            <ProccessIconTable id={settlement[dataIndex].id} fuctionSetter={updateSettlementElement}/>
                        </Tooltip>
                        {settlement[dataIndex].processed ? 
                            <Tooltip title="Descargar liquidación">
                                <IconButton aria-label="download" onClick={() => handleExportExcel('/settlement/api/v1/export/', settlement[dataIndex].id, axiosPrivate)}>
                                    <FileDownloadIcon color="success" />
                                </IconButton>
                            </Tooltip>: 
                            null
                        }
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
        search: false,
        viewColumns: false,
        filter: false,
        selectableRows: 'multiple',
        selectableRowsHeader: false,
        isRowSelectable: function (dataIndex, selectedRows) {
            return !settlement[dataIndex].has_payroll
        },
        onRowSelectionChange:function (currentRowsSelected, allRowsSelected, rowsSelected) {
            let ids = []
            let dataIndex 
            for (let index = 0; index < allRowsSelected.length; index++) {
                dataIndex = allRowsSelected[index].dataIndex;
                ids.push({settlement_id:settlement[dataIndex].id})
            }
            setSettlementSelected(ids)

            console.log(allRowsSelected);
        },
        tableBodyHeight:'55vh',
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
                <Box sx={{my:2}}>
                    <CreatePayroll settlementSelected={settlementSelected}/>
                    <DateRangePicker color="primary"/>
                </Box>
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
