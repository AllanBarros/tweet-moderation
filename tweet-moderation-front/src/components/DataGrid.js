import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'usuario',
    headerName: 'Usuario',
    width: 150,
  },
  {
    field: 'texto',
    headerName: 'Tweet',
    width: 150,
  },
  {
    field: 'aprovado',
    headerName: 'Aprovado?',
    width: 110,
  },
];

export default function Table(props) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={15}
        checkboxSelection
        // disableSelectionOnClick
      />
    </div>
  );
}