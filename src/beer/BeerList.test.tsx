import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import renderer from 'react-test-renderer';

import { IBeer, IBeerListProps } from './beerTypes';
import { getBeers } from './mockData';
import BeerList from './BeerList';

describe(`BeerList rendering`, () => {
  let beers: IBeer[];

  beforeEach(() => {
    beers = getBeers();
  });

  it(`should render a list of beers`, () => {
    const tree = renderer.create(
      <BeerList beers={beers} upvoteBeer={jest.fn()} />,
    );
    expect(tree).toMatchSnapshot();
  });
});

describe(`BeeList props`, () => {
  let beerList: RenderResult;
  let beers: IBeer[];
  let mockUpvote: jest.Mock;

  function renderList(args?: Partial<IBeerListProps>): RenderResult {
    const defaultProps: IBeerListProps = {
      beers,
      upvoteBeer: () => {},
    };

    const props = { ...defaultProps, ...args };
    return render(<BeerList {...props} />);
  }

  beforeEach(() => {
    beers = getBeers();
    mockUpvote = jest.fn();
    beerList = renderList({ upvoteBeer: mockUpvote });
  });

  afterEach(cleanup);

  it(`should call upvoteBeer when the event is passed up from the child`, () => {
    const { getAllByTestId } = beerList;
    const btns = getAllByTestId('upvoteButton');
    fireEvent.click(btns[0]);
    expect(mockUpvote).toHaveBeenCalledWith(beers[0]);
  });
});
