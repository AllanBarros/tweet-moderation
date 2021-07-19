import '../App.css';
import {useState, useEffect} from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import Header from '../components/Header';
import Table from '../components/DataGrid';
import { GET, POST } from '../backend';

function Moderate() {
  const [lista, setLista] = useState([])
  const [aprovados, setAprovados] = useState([])

  useEffect(() => {
    GET('/listar-tweets', setLista)
  }, [])

  const aprovar_tweets = () => {
    POST('/aprovar-tweets', aprovados);
  }

  return (
    <div className="">
      <div>
        <Header />
      </div>
      <Grid container spacing={2} className="espacamento">
        <Grid item xs={12}>
          <Typography variant='h4'>Tweets</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} className="espacamento">
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Table rows={lista} aprovar={setAprovados}/>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Grid container spacing={1} className="espacamento">
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Button variant='contained' color='primary' fullWidth={true} onClick={() => {aprovar_tweets()}}>Aprovar</Button>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>

    </div>
  );
}

export default Moderate