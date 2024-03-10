import MUIDataTable  from "mui-datatables";
import { useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Accordion, AccordionDetails, Box, Container, Table, TableCell, TableRow, TableBody, Grid } from "@mui/material";
import TableHead from '@mui/material/TableHead';
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import ExportSettlement from "./ExportSettlement";
import { useParams } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ProcessSettlement from "./ProcessSettlement";
import { dateFormat } from "../utils/format";
import { dateFormatSet } from "../utils/dateFormatSettlement";

const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableHeadCell: {
          styleOverrides:{ 
            root: {
            backgroundColor: 'rgb(129,202,242)',
            maxWidth:'100vw',
          }}
        }
        
      }
});

export const DataDetailedSte = () => {
    const [settlement, setSettlement] = useState( [] )
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [expand] = useState([]);

    useEffect( ()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getSettlement = async () => {
            try {
                const response = await axiosPrivate.get(`/settlement/api/v1/settlements/${id}/`, {
                    signal: controller.signal
                });
                isMounted && setSettlement(response.data);
            } catch (error) {
                console.error(error);
                // navigate('/auth/login', { state: { from: location }, replace: true });
            }
        }

        getSettlement();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const columns = [
        { name: "worker_info.name", label: "Trabajador"},
        { name: "worker_info.document", label: "Documento"},
        { name: "monday", label: "Lunes"},
        { name: "tuesday", label: "Martés"},
        { name: "wednesday", label: "Miércoles"},
        { name: "thursday", label: "Jueves"},
        { name: "friday", label: "Viernes"},
        { name: "saturday", label: "Sábado"},
        { name: "sunday", label: "Domingo"},
        { name: "total_hours", label: "Total Horas"},
        { name: "ordinary_hours", label: "H.O"},
        { name: "daytime_overtime", label: "H.E.D"},
        { name: "night_surcharge_hours", label: "H.R.N"},
        { name: "night_overtime", label: "H.E.N"},
        { name: "holiday_hours", label:"H.F" },
        { name: "night_holiday_hours", label: "H.F.N"},
        { name: "daytime_holiday_overtime", label: "H.F.D"},
        { name: "night_holiday_overtime", label: "H.E.F.N"},
    ]
        
    const options = {
        filterType: 'checkbox',
        download:false,
        responsive: 'standard',
        filter: false,
        selectableRows: 'none',
        tableBodyHeight:'75vh',
        expandableRows: true,
        expandableRowsHeader: false,
        fixedHeader: true,
        enableNestedDataAccess: ".",
        renderExpandableRow: (rowData, rowMeta) => {
            const colSpan = rowData.length + 5;
            const {
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday
            } = settlement.details[rowMeta.dataIndex].working_shifts
            return (
                <tr>
                    <td colSpan={colSpan}>
                        <Accordion expanded={expand.includes(rowMeta.rowIndex)}>
                            <AccordionDetails>
                                <h4>Horas trabajadas</h4>
                                <Table sx={{ maxWidth: 900 }} aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Día</TableCell>
                                            <TableCell>Entrada</TableCell>
                                            <TableCell>Salida</TableCell>
                                            <TableCell>Entrada Normalizada</TableCell>
                                            <TableCell>Salida Normalizada</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Lunes</TableCell>
                                            <TableCell>{dateFormat(monday.start)}</TableCell>
                                            <TableCell>{dateFormat(monday.end)}</TableCell>
                                            <TableCell>{dateFormat(monday.start_normalized)}</TableCell>
                                            <TableCell>{dateFormat(monday.end_normalized)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Martes</TableCell>
                                            <TableCell>{dateFormat(tuesday.start)}</TableCell>
                                            <TableCell>{dateFormat(tuesday.end)}</TableCell>
                                            <TableCell>{dateFormat(tuesday.start_normalized)}</TableCell>
                                            <TableCell>{dateFormat(tuesday.end_normalized)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Miércoles</TableCell>
                                            <TableCell>{dateFormat(wednesday.start)}</TableCell>
                                            <TableCell>{dateFormat(wednesday.end)}</TableCell>
                                            <TableCell>{dateFormat(wednesday.start_normalized)}</TableCell>
                                            <TableCell>{dateFormat(wednesday.end_normalized)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Jueves</TableCell>
                                            <TableCell>{dateFormat(thursday.start)}</TableCell>
                                            <TableCell>{dateFormat(thursday.end)}</TableCell>
                                            <TableCell>{dateFormat(thursday.start_normalized)}</TableCell>
                                            <TableCell>{dateFormat(thursday.end_normalized)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Viernes</TableCell>
                                            <TableCell>{dateFormat(friday.start)}</TableCell>
                                            <TableCell>{dateFormat(friday.end)}</TableCell>
                                            <TableCell>{dateFormat(friday.start_normalized)}</TableCell>
                                            <TableCell>{dateFormat(friday.end_normalized)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Sábado</TableCell>
                                            <TableCell>{dateFormat(saturday.start)}</TableCell>
                                            <TableCell>{dateFormat(saturday.end)}</TableCell>
                                            <TableCell>{dateFormat(saturday.start_normalized)}</TableCell>
                                            <TableCell>{dateFormat(saturday.end_normalized)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Domingo</TableCell>
                                            <TableCell>{dateFormat(sunday.start)}</TableCell>
                                            <TableCell>{dateFormat(sunday.end)}</TableCell>
                                            <TableCell>{dateFormat(sunday.start_normalized)}</TableCell>
                                            <TableCell>{dateFormat(sunday.end_normalized)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </AccordionDetails>
                        </Accordion>
                    </td>
                </tr>
            );
        },
        elevation:10, 
        textLabels: {
            toolbar: {
                search: "Buscar liquidación",
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
                columnHeaderTooltip: column => `${column.label}`,
                expandableRows: "Ver horas trabajadas",

            },
            selectedRows: {
                text: "Columnas seleccionadas",
                delete: "Eliminar Liquidación",
            },  
        },
    }

    return(
        <ThemeProvider theme={getMuiTheme()}> 
            <Container sx={{paddingTop: "15px", minWidth:700}} >
                <Grid container spacing={2}>
                    <Grid item xs={12}> 
                        <h3>Fecha inicio: {dateFormatSet(settlement.start_date?? "")}</h3>
                        <h3>Fecha final: {dateFormatSet(settlement.end_date?? "")}</h3>
                    </Grid>
                    <Grid item xs={6} md={5}>
                        <Box sx={{paddingTop: "1px", mb:1, display: "flex", gap: "10px"}}>
                            <ProcessSettlement id={settlement.id} fuctionSetter={setSettlement}/>
                            {settlement.processed ? 
                            <ExportSettlement id={settlement.id}/> : 
                            null
                            }
                        </Box>
                    </Grid>
                </Grid>

                <MUIDataTable 
                    title="Información detallada de las liquidaciones"
                    data={settlement.details}
                    columns={columns}
                    options={options}

                />
            </Container>
        </ThemeProvider>
    )
}
