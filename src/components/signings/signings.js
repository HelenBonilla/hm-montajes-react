import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from 'axios';
import * as React from 'react';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import { IconButton } from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { format } from 'date-fns';

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

export const DataSignings = () => {

    const [workers, setWorkers] = useState( [] )
    const [openModal, setOpenModal] = React.useState(false);
    const [archivos, setArchivos] = useState(null)

    const subirArchivos = files => {
        setArchivos(files)
    }

    const importarArchivo=async()=>{
        const formData = new FormData();
        formData.append("excel_file", archivos[0]);

        axios.post('http://127.0.0.1:8000/workers/api/v1/import-signings/', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
        .then(response=>{
            console.log(response.data)
        }).catch(error=>{
            console.log(error)
        })

        handleClose()
        {<CircularProgress />}
    }

    const endpoint = 'http://127.0.0.1:8000/workers/api/v1/signings/'

    const handleClickOpen = () => {
        setOpenModal(true);
    };
    
    const handleClose = () => {
        setOpenModal(false);
    };
    
    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data
            console.log(data)
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
                  const fechaFormateada = format(new Date(value), 'yyyy-MM-dd h:mm a');
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
                  const fechaFormateada = format(new Date(value), 'yyyy-MM-dd h:mm a');
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
    
    return (
        <ThemeProvider theme={getMuiTheme()}>
            <Container maxWidth="xl">
                <Box sx={{py: "1px", my: 2}}>
                    <Button variant="contained" onClick={handleClickOpen} startIcon={<CloudUploadIcon />}>
                        Importar fichaje
                    </Button>
                </Box>
                
                <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openModal}>
                    <DialogTitle sx={{ m: 0, p: 2, backgroundColor:blue[300], color:grey[50]}} id="customized-dialog-title">
                        Archivo
                    </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: blue[800],
                            }}
                            >
                            <CloseIcon />
                        </IconButton>
                    <DialogContent >
                        <input type='file' onChange={(e)=>subirArchivos(e.target.files)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={()=>importarArchivo()}>Importar</Button>
                    </DialogActions>
                </BootstrapDialog>
                <MUIDataTable 
                    title="Lista de fichajes"
                    data={workers}
                    columns={columns}
                    options={options}
                />
            </Container>
        </ThemeProvider>
    )
}
