import { forwardRef } from 'react';
import MaterialTable, { MaterialTableProps } from 'material-table';
// import { TablePagination, TablePaginationProps } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


// function PatchedPagination(props) {
//   const {
//     ActionsComponent,
//     onChangePage,
//     onChangeRowsPerPage,
//     ...tablePaginationProps
//   } = props;

//   return (
//     <TablePagination
//       {...tablePaginationProps}
//       // @ts-expect-error onChangePage was renamed to onPageChange
//       onPageChange={onChangePage}
//       onRowsPerPageChange={onChangeRowsPerPage}
//       ActionsComponent={(subprops) => {
//         const { onPageChange, ...actionsComponentProps } = subprops;
//         return (
//           // @ts-expect-error ActionsComponent is provided by material-table
//           <ActionsComponent
//             {...actionsComponentProps}
//             onChangePage={onPageChange}
//           />
//         );
//       }}
//     />
//   );
// }

export default function Table(props) {

  return (
    <MaterialTable
      // components={{ Pagination: PatchedPagination }}
      icons={tableIcons}
      pageSize={15}
      title="Tweets"
      columns={[
        { title: 'Id', field: '_id' },
        { title: 'Usuario', field: 'usuario' },
        { title: 'Tweet', field: 'texto' },
        { title: 'Aprovado?', field: 'aprovado' },
      ]}
      data={props.rows}
      options={{
        selection: props.selection
      }}
      onSelectionChange={(rows) => {
        let ids = []
        rows.map(r => {
          return ids.push(r._id)
        })
        props.aprovar(ids);
      }}
    />
  )
}