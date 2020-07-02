import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Header from './components/common/Header';
import HomePage from './components/HomePage';

const App: React.FC<any> = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
