import MUIDataTable, { TableBody, TableHead }  from "mui-datatables";
import { useEffect, useState} from "react";
import { Accordion, AccordionDetails, Box, /* Button,  */Container, Table, TableCell, TableRow} from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import * as React from "react";
import ExportSettlement from "./ExportSettlement";
import { useParams } from "react-router";
import axios from "axios";
import ProcessSettlement from "./ProcessSettlement";
import { API_URL } from "../utils/constants"


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


    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data
            setSettlement(data)        
        })
    }


    useEffect( ()=>{
        getData();
        console.log(id)
    }, [])

    const columns = [
       
        { name: "worker_info",label: "Trabajador", options: {
            customBodyRender: (value) => {
              return (
                <span>{value.name}</span>
              );
            },
        }},
        //{name: "working_shifts.friday"},
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
            return (    
                <tr>
                <td colSpan={colSpan}>
                  <Accordion expanded={expand.includes(rowMeta.rowIndex)}>       
                    <AccordionDetails>
                        <h4>Horas trabajadas</h4>
                        <div>
                        <Table sx={{ maxWidth: 600 }} aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Día</TableCell>
                                    <TableCell>Entrada</TableCell>
                                    <TableCell>Salida</TableCell>
                                </TableRow>
                                <TableBody>
                                    {Object.keys(settlement.details[rowMeta.dataIndex].working_shifts).map((key, value) => (
                                        console.log('Columna:', value, key)
                                    ))}

                                </TableBody>
                                
                            </TableHead>
                        </Table>
                        </div>
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
