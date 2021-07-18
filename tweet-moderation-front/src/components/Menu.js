import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Menu(props) {

    const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

    useEffect(() => {
        setState(props.state)
    }, [props.state])

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem button key={'hashtag'}>
          <Link to="/hashtag">
            <ListItemIcon><SearchIcon/></ListItemIcon>
            <ListItemText primary='Busca de hashtag' />
            </Link>
        </ListItem>
            <Divider />
            <ListItem button key={'moderate'}>
            <Link to="/moderate">
            <ListItemIcon><TwitterIcon/></ListItemIcon>
            <ListItemText primary={'Moderação de tweets'} />
            </Link>
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={'drawer'}>
          <Drawer anchor='left' open={state} onClose={toggleDrawer(false)}>
            {list}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default Menu;