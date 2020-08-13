import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalStyles, LightModeProvider } from './global';
import { Landing } from './pages';

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
