import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
} from '@testing-library/react';

import { HomePage, IHomePageProps } from './HomePage';
import { getBeers } from '../beer/mockData';
import { IBeer } from '../beer/beerTypes';

function renderPage(args?: Partial<IHomePageProps>) {
  const defaultProps: IHomePageProps = {
    beers: getBeers(),
    loadBeers: jest.fn(),
    upvoteBeer: jest.fn(),
  };

  const props = { ...defaultProps, ...args };
  return render(<HomePage {...props} />);
}

describe('HomePage', () => {
  afterEach(cleanup);

  let beers: IBeer[];
  let homePage: RenderResult;
  let mockLoad: jest.Mock;
  let mockUpvote: jest.Mock;

  beforeEach(() => {
    beers = getBeers();
    mockUpvote = jest.fn();
    mockLoad = jest.fn();
    homePage = renderPage({
      upvoteBeer: mockUpvote,
      loadBeers: mockLoad,
      beers,
    });
  });

  it(`should call upvoteBeer action prop when upvoteBeer event happens`, () => {
    const { getAllByTestId } = homePage;
    const btns = getAllByTestId('upvoteButton');
    fireEvent.click(btns[0]);
    expect(mockUpvote).toHaveBeenCalledWith(beers[0]);
  });

  it(`should call loadBeers when useEffect() is triggered`, () => {
    expect(mockLoad).toHaveBeenCalled();
  });
});
