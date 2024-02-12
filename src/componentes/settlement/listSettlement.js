import * as React from 'react';
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { Container, Dialog,DialogContent, Tooltip, IconButton, Button, DialogActions, DialogTitle } from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';

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
            primary:{
                main:'#81c784'
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

export const DataSettlement = () => {

    const [settlement, setSettlement] = useState( [] )
    const [openModal, setOpenModal] = React.useState(false);
    const [archivos, setArchivos] = useState(null)


    const subirArchivos=e=>{
        setArchivos(e)
    }

    const importarArchivo=async()=>{
        const f = new FormData();

        for (let index = 0; index < archivos[index]; index++) {
            f.append("files", archivos[index]);
            
        }

        await axios.post("",f)
        .then(response=>{
            console.log(response.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    const endpoint = 'http://127.0.0.1:8000/settlement/api/v1/settlements/'

    const handleClickOpen = () => {
        setOpenModal(true);
    };
    
    const handleClose = () => {
        setOpenModal(false);
    };

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data
            setSettlement(data)
        })
    }

    useEffect( ()=>{
        getData()
    }, [])
        
    const columns = [
        {
            name: "start_date",
            label: "Fecha Inicio",
            options: {
                customBodyRender: (value) => {
                  const fechaFormateada = format(new Date(value), 'yyyy-MM-dd h:mm a');
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
                  const fechaFormateada = format(new Date(value), 'yyyy-MM-dd h:mm a');
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
                            <IconButton aria-label="view">
                                <Link to={`/Liquidaciones/${settlement[dataIndex].id}`} ><VisibilityIcon color='secondary'/></Link>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Descargar">
                            <IconButton aria-label="download">
                                <FileDownloadIcon color="primary" />
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
        download:false,
        responsive:true,
        print:false,
        viewColumns:false,
        filter: false,
        selectableRows:false,
        tableBodyHeight:'75vh',
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
            <Container maxWidth="xl" sx={{paddingTop: "15px"}}  >
                <Button variant="contained" onClick={handleClickOpen} startIcon={<CloudUploadIcon />}>
                    Importar fichaje
                </Button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={openModal}
                >
                
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor:blue[300]}} id="customized-dialog-title">
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

                <DialogContent dividers>
                    <input type='file' onChange={(e)=>subirArchivos(e.target.files)}/>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" onClick={()=>importarArchivo()}>Importar</Button>
                </DialogActions>
                    
                </BootstrapDialog>
                     
                                    
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
