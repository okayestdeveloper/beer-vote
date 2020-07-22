import { IProfile } from './../hooks/useProfile';

export const BEER_COLOR_MAP: Array<string> = [
  '#FFE699',
  '#FFD878',
  '#FFCA5A',
  '#FFBF42',
  '#FBB123',
  '#F8A600',
  '#F39C00',
  '#EA8F00',
  '#E58500',
  '#DE7C00',
  '#D77200',
  '#CF6900',
  '#CB6200',
  '#C35900',
  '#BB5100',
  '#B54C00',
  '#B04500',
  '#A63E00',
  '#A13700',
  '#9B3200',
  '#952D00',
  '#8E2900',
  '#882300',
  '#821E00',
  '#7B1A00',
  '#771900',
  '#701400',
  '#6A0E00',
  '#660D00',
  '#5E0B00',
  '#5A0A02',
  '#600903',
  '#520907',
  '#4C0505',
  '#470606',
  '#440607',
  '#3F0708',
  '#3B0607',
  '#3A070B',
  '#36080A',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
];

export enum EBeerStatus {
  VOTING = 'voting',
  DRAFT = 'draft',
  AVAILABLE = 'available',
  BREWING = 'brewing',
}

export enum EServingFormat {
  BOTTLE_12_OZ = '12oz bottle',
  BOTTLE_22_OZ = '22oz bottle',
  BOTTLE_500_ML = '500ml bottle',
  BOTTLE_750_ML = '750ml bottle',
  CAN_12_OZ = '12oz can',
  CAN_16_OZ = '16oz can',
  DRAUGHT = 'draught',
}

export interface IBeer {
  id: string;
  ABV?: number;
  maxABV: number;
  minABV: number;
  description?: string;
  name: string;
  style: string;
  servingFormats?: EServingFormat[];
  tags?: string[];
  status: EBeerStatus;
  votes: number;
  srm: number;
}

// Props
export interface IBeerListProps {
  beers: IBeer[];
  upvoteBeer: (beer: IBeer, profile: IProfile) => void;
}

export interface IBeerCardProps {
  beer: IBeer;
  upvote: (beer: IBeer, profile: IProfile) => void;
}
