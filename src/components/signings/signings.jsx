import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Container } from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import ImportarArchivo from "./ImportarArchivo";
import { API_URL } from "../utils/constants";
import { dateFormat } from "../utils/format";

const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableHeadCell: {
          styleOverrides:{ 
            root: {
            backgroundColor: '#81d4fa',
          }}
        }
        
      }
});


export const DataSignings = () => {

    const [workers, setWorkers] = useState( [] )

    const endpoint = `${API_URL}/workers/api/v1/signings/`
    
    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data
            setWorkers(data)
        })
    }

    useEffect( ()=>{
        getData()
    }, [])
        
    const columns = [
        {
            name: "id",
            label: "id"
        },
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
            label: "Número de contrato"
        },
    ]
        
    const options = {
        filterType: 'checkbox',
        responsive: true,
        filter: false,
        selectableRows: false,
        tableBodyHeight: 440,
        elevation: 10, 
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
                <Container maxWidth="xl" >
                    <div>
                        <ImportarArchivo/>

                        <MUIDataTable 
                            title="Lista de fichajes"
                            data={workers}
                            columns={columns}
                            options={options}
                        />  
                    </div>
                                                             
                </Container>
            </ThemeProvider>
        
        )

    
    
}
