import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from 'axios';
import * as React from 'react';
import { Box, Button, Container,Dialog, DialogActions, DialogContent, DialogTitle,Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { createTheme , ThemeProvider  }  from  '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

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
            name: "name",
            label: "Nombre completo"
        },
        {
            name: "document",
            label: "Documento"
        },
        {
            name:"action",
            label:"Acciones",
            options: {
                customBodyRender: () => {
                  return (
                    <div>
                         <Tooltip title="Ver fichaje">
                            <IconButton aria-label="visibility">
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar fichaje">
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    

                    </div>
                   
                  );
                }
            }
        }
    ]
        
    const options = { filterType: 'checkbox', responsive:true, filter: false, selectableRows:false, tableBodyHeight:440, elevation:10, 
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
                    <Box sx={{paddingTop: "1px", m:1}}>
                        <Button variant="contained" onClick={handleClickOpen} startIcon={<CloudUploadIcon />}>
                            Importar fichaje
                        </Button>
                    </Box>
                    
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={openModal}
                    >           
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
