import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import renderer from 'react-test-renderer';

import { IBeer, IBeerCardProps } from './beerTypes';
import BeerCard from './BeerCard';
import { getBeers } from './mockData';

describe('BeerCard rendering', () => {
  let beers: IBeer[];

  beforeEach(() => {
    beers = getBeers();
  });

  it(`should render a card for a beer that's in voting status`, () => {
    const tree = renderer.create(
      <BeerCard beer={beers[0]} upvote={jest.fn()} />,
    );
    expect(tree).toMatchSnapshot();
  });

  it(`should render a card for a beer that's in available status`, () => {
    const tree = renderer.create(
      <BeerCard beer={beers[1]} upvote={jest.fn()} />,
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('BeerCard props', () => {
  let card: RenderResult;
  let mockUpvote: jest.Mock;
  let beers: IBeer[];

  function renderCard(args?: Partial<IBeerCardProps>): RenderResult {
    const defaultProps: IBeerCardProps = {
      beer: beers[0],
      upvote: () => {},
    };

    const props = { ...defaultProps, ...args };
    return render(<BeerCard {...props} />);
  }

  beforeEach(() => {
    beers = getBeers();
    mockUpvote = jest.fn();
    card = renderCard({ upvote: mockUpvote });
  });

  afterEach(cleanup);

  it(`should call the upvote when user clicks the button`, () => {
    const btn = card.getByTestId('upvoteButton');
    fireEvent.click(btn);
    expect(mockUpvote).toHaveBeenCalled();
  });
});
