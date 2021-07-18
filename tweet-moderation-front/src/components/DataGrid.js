import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: '_id', headerName: 'ID', width: 250 },
  {
    field: 'usuario',
    headerName: 'Usuario',
    width: 150,
  },
  {
    field: 'texto',
    headerName: 'Tweet',
    width: 400,
  },
  {
    field: 'aprovado',
    headerName: 'Aprovado?',
    width: 150,
  },
];

export default function Table(props) {

  const [selectionModel, setSelectionModel] = React.useState([]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(r) => r._id}
        rows={props.rows}
        columns={columns}
        pageSize={15}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          props.aprovar(newSelection.selectionModel);
        }}
      />
    </div>
  );
}