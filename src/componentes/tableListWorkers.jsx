import React from 'react';
import MaterialTable from 'material-table'


    const columns = [
      {title:'Id', field:'id'},
      {title:'Nombre completo', field:'name'},
      {title:'Documento', field:'document'}
    ]

    const data = [
      {id:"1", name:"Valentina cardona", document:"14785232"},
      {id:"2", name:"Carolina Morales", document:"47852302"},
      {id:"3", name:"Sebastian Pineda", document:"11478523256"},
    
    ]
    export default function DataTableWorkers (){
    return (
      <div style={{ height: 400, width: '100%' }}>
        <MaterialTable
          rows={data}
          columns={columns}
          
        />
      </div>
    );
}


