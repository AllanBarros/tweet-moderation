import '../App.css';
import { useState } from 'react';
import { TextField, Typography, Grid, Button } from '@material-ui/core';
import Header from '../components/Header';
import { POST } from '../backend';

function HashTagSelection() {

    const [hashtag, setHash] = useState('')
    const [lista, setLista] = useState([])
    const [valido, setValido] = useState(false)

    const handle_hashtag = (e) =>{
        let pattern = "[a-zA-Z]*[1-9]*" ;
        let valor = e.target.value
        if (valor.match(pattern) != "") {
            setValido(true)
            return setHash(e.target.value);
        }else{
            setHash(e.target.value);
            return setValido(false);
        }
    }

    const buscar_hashtag = () =>{
        let resultado = POST('/hashtag', hashtag);
        return setLista(resultado);
    }

    return (
        <div className="">
            <div>
                <Header />
            </div>
            <Grid container spacing={2} className="espacamento">
                <Grid item xs={12}>
                    <Typography variant='h4'>Seleção de Hashtag</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} className="espacamento">
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>

                    <TextField error={!valido} helperText={"Digite apenas a palavra sem #"} className="ocupar" variant="outlined" required id="standard-required" label="Digite a hashtag para busca"  value={hashtag} onChange={(e) =>{handle_hashtag(e)}}/>
                    <Button disabled={!valido} className="margem" variant='contained' color='primary' fullWidth={true} onClick={()=>{buscar_hashtag()}}>Buscar</Button>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
}

export default HashTagSelection