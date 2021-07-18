import '../App.css';
import { useState } from 'react';
import { TextField, Typography, Grid, Button } from '@material-ui/core';
import Header from '../components/Header';
import { POST } from '../backend';

function HashTagSelection() {

    const [hashtag, setHash] = useState('')
    const [lista, setLista] = useState([])

    const handle_hashtag = (e) =>{
        return setHash(e.target.value);
    }

    const buscar_hashtag = () =>{
        let resultado = POST('/hashtag', hashtag);
        return setLista(resultado);
    }

    // useEffect(() => {
    //   if (tokenload){ 
    //     handleGetFields('multiplos/regime_tributacao/'+ tokenload, dispatch, handleGet, tokenload)
    //   }  
    // }, [])

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
                    <TextField className="ocupar" variant="outlined" required id="standard-required" label="Digite a hashtag para busca"  value={hashtag} onChange={(e) =>{handle_hashtag(e)}}/>
                    <Button onClick={()=>{buscar_hashtag()}}>Buscar</Button>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
}

export default HashTagSelection