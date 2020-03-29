import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalStyles } from './global';
import { Landing } from './pages';

const App = () => (
  <Router>
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </>
  </Router>
);

export default App;
