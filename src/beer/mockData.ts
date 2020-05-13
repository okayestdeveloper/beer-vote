import { IBeer, EServingFormat, EBeerStatus } from './beerTypes';

const beers: IBeer[] = [
  {
    id: 'beer1',
    maxABV: 7.0,
    minABV: 6.0,
    description: 'A dark chocolate milk stout.',
    name: 'Valkyrie',
    style: 'Chocolate Stout',
    servingFormats: [EServingFormat.BOTTLE_12_OZ, EServingFormat.CAN_12_OZ],
    tags: ['dark', 'chocolate', 'rich'],
    status: EBeerStatus.VOTING,
    votes: 543,
  },
  {
    id: 'beer2',
    ABV: 5.5,
    maxABV: 4.0,
    minABV: 6.0,
    description: 'An American Pale Ale with tropical, fruity hops.',
    name: 'Seeker',
    style: 'Juicy Pale Ale',
    servingFormats: [EServingFormat.DRAUGHT],
    tags: ['juicy', 'bright', 'refreshing'],
    status: EBeerStatus.AVAILABLE,
    votes: 32,
  },
];

export const getBeers = (): IBeer[] => {
  return JSON.parse(JSON.stringify(beers));
};
