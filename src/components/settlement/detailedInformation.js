import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';

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

    const { id } = useParams();
    const [settlement, setSettlement] = useState( [] )
    const endpoint = `http://localhost:8000/settlement/api/v1/settlements/${id}/`

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data
            console.log(data)
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
            <Container  sx={{paddingTop: "15px", minWidth:700}} >
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
