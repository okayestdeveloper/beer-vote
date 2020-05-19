jest.mock('./components/HomePage');
jest.mock('./components/common/Header');

import React, { ReactElement } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import renderer from 'react-test-renderer';

import App from './App';

function makeApp(history?: MemoryHistory): ReactElement {
  return (
    <Router history={history || createMemoryHistory()}>
      <App />
    </Router>
  );
}

describe(`App rendering by route`, () => {
  it(`should render the HomePage on the / path`, () => {
    const history = createMemoryHistory();
    history.push('/');

    const tree = renderer.create(makeApp(history));
    expect(tree).toMatchSnapshot();
  });
});
