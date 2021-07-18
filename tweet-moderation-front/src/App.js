import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Moderate from './pages/Moderate';
import HashTagSelection from './pages/HashtagSelection';

function App() {
  return (
    <BrowserRouter>
          <Switch>
              <Route exact path='/moderate' component={Moderate} />
              <Route exact path='/hashtag' component={HashTagSelection} />
          </Switch>
    </BrowserRouter>
  );
}

export default App;
