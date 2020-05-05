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
}

// Props
export interface IBeerListProps {
  beers: IBeer[];
  upvoteBeer: (beer: IBeer) => void;
}

export interface IBeerCardProps {
  beer: IBeer;
  upvote: (beer: IBeer) => void;
}
