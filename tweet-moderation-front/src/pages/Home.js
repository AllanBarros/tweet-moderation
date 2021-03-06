import '../App.css';
import {useState, useEffect} from 'react';
import { Grid, Typography} from '@material-ui/core';
import Header from '../components/Header';
import Table from '../components/DataGrid';
import { GET} from '../backend';

function Moderate() {
  const [lista, setLista] = useState([])

  useEffect(() => {
     GET('/listar-tweets-aprovados', setLista)
  }, [])

  return (
    <div className="">
      <div>
        <Header />
      </div>
      <Grid container spacing={2} className="espacamento">
        <Grid item xs={12}>
          <Typography variant='h4'>Tweets Aprovados</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} className="espacamento">
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Table rows={lista} selection={false}/>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default Moderate