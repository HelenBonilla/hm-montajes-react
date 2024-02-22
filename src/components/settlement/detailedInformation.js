import MUIDataTable  from "mui-datatables";
import { useEffect, useState} from "react";
import { Accordion, AccordionDetails, Box,Container, Table, TableCell, TableRow, TableBody} from "@mui/material";
import TableHead from '@mui/material/TableHead';
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import * as React from "react";
import ExportSettlement from "./ExportSettlement";
import { useParams } from "react-router";
import axios from "axios";
import ProcessSettlement from "./ProcessSettlement";
import { API_URL } from "../utils/constants"
import { dateFormat } from "../utils/format";
import { dateFormatSet } from "../utils/dateFormatSettlement";

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

export const DataDetailedSte = () => {
    const [settlement, setSettlement] = useState( [] )
    const { id } = useParams();
    const endpoint = `${API_URL}/settlement/api/v1/settlements/${id}/`
    const [expand] = React.useState([]);
    console.log(settlement)
    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data
            setSettlement(data)        
        })
    }

    useEffect( ()=>{
        getData();
        
    }, [])

    const columns = [
       
        { name: "worker_info",label: "Trabajador", options: {
            customBodyRender: (value) => {
              return (
                <span>{value.name}</span>
              );
            },
        }},
        { name: "monday",label: "Lunes"},
        { name: "tuesday",label: "Martés"},
        { name: "wednesday",label: "Miércoles"},
        { name: "thursday",label: "Jueves"},
        { name: "friday",label: "Viernes"},
        { name: "saturday",label: "Sábado"},
        { name: "sunday",label: "Domingo"},
        { name: "total_hours",label: "Total Horas"},
        { name: "ordinary_hours",label: "H.O"},
        { name: "daytime_overtime",label: "H.E.D"},
        { name: "night_surcharge_hours",label: "H.R.N"},
        { name: "night_overtime",label: "H.E.N"},
        { name: "holiday_hours",label:"H.F" },
        { name: "night_holiday_hours",label: "H.F.N"},
        { name: "daytime_holiday_overtime",label: "H.F.D"},
        { name: "night_holiday_overtime",label: "H.E.F.N"},
    ]
        
    const options = {
        filterType: 'checkbox',
        download:false,
        responsive:true,
        filter: false,
        selectableRows:false,
        tableBodyHeight:'75vh',
        expandableRows: true,
        expandableRowsHeader: false,
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
                                <Table sx={{ maxWidth: 600 }} aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Día</TableCell>
                                            <TableCell>Entrada</TableCell>
                                            <TableCell>Salida</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Lunes</TableCell>
                                            <TableCell>{dateFormat(monday.start)}</TableCell>
                                            <TableCell>{dateFormat(monday.end)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Martes</TableCell>
                                            <TableCell>{dateFormat(tuesday.start)}</TableCell>
                                            <TableCell>{dateFormat(tuesday.end)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Miércoles</TableCell>
                                            <TableCell>{dateFormat(wednesday.start)}</TableCell>
                                            <TableCell>{dateFormat(wednesday.end)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Jueves</TableCell>
                                            <TableCell>{dateFormat(thursday.start)}</TableCell>
                                            <TableCell>{dateFormat(thursday.end)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Viernes</TableCell>
                                            <TableCell>{dateFormat(friday.start)}</TableCell>
                                            <TableCell>{dateFormat(friday.end)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Sábado</TableCell>
                                            <TableCell>{dateFormat(saturday.start)}</TableCell>
                                            <TableCell>{dateFormat(saturday.end)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Domingo</TableCell>
                                            <TableCell>{dateFormat(sunday.start)}</TableCell>
                                            <TableCell>{dateFormat(sunday.end)}</TableCell>
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
            <Container  sx={{paddingTop: "15px", minWidth:700}} >             
                <h3>Fecha inicio: {dateFormatSet(settlement.start_date?? "")}</h3> 
                <h3>Fecha final: {dateFormatSet(settlement.end_date?? "")}</h3>
                <Box sx={{paddingTop: "1px", mb:1, display: "flex", gap: "10px"}}>                   
                    <ProcessSettlement id={settlement.id} fuctionSetter={setSettlement}/> 
                    {settlement.processed ? 
                    <ExportSettlement id={settlement.id}/> : 
                    null
                    }
                </Box>

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
