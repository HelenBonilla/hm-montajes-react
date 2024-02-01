import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';

export const DataWorker = () => {

    const [workers, setWorkers] = useState( [] )

    const endpoint = 'http://127.0.0.1:8000/workers/api/v1/workers/'

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
            label: "ID"
        },
        {
            name: "name",
            label: "NOMBRE COMPLETO"
        },
        {
            name: "document",
            label: "DOCUMENTO"
        }
    ]
        
    const options = { filterType: 'checkbox',}

    return(
        <MUIDataTable 
            title={"Lista de trabajadores"}
            data={workers}
            columns={columns}
            options={options}
        />
    )
}