import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalStyles } from './global';
import { Landing } from './pages';
import LightModeProvider from './global/Providers/LightMode';

const App = () => (
  <Router>
    <>
      <GlobalStyles />
      <Switch>
        <LightModeProvider>
          <Route exact path="/" component={Landing} />
        </LightModeProvider>
      </Switch>
    </>
  </Router>
);

export default App;
