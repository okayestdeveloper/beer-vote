import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Forward from '@material-ui/icons/Forward';
import { green } from '@material-ui/core/colors';

import {
  IBeer,
  IBeerCardProps,
  EBeerStatus,
  EServingFormat,
  BEER_COLOR_MAP,
} from './beerTypes';
import { useProfile, IProfile } from '../hooks/useProfile';

// icons
import bottle12 from './assets/12oz bottle.png';
import bottle22 from './assets/22oz bottle.png';
import bottle500 from './assets/500ml bottle.png';
import bottle750 from './assets/750ml bottle.png';
import can16 from './assets/16oz can.png';
import can12 from './assets/12oz can.png';
import draught from './assets/draught.png';

const servingImageMap: Map<EServingFormat, any> = new Map([
  [EServingFormat.BOTTLE_12_OZ, bottle12],
  [EServingFormat.BOTTLE_22_OZ, bottle22],
  [EServingFormat.BOTTLE_500_ML, bottle500],
  [EServingFormat.BOTTLE_750_ML, bottle750],
  [EServingFormat.CAN_12_OZ, can12],
  [EServingFormat.CAN_16_OZ, can16],
  [EServingFormat.DRAUGHT, draught],
]);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    beerCard: {
      width: '320px',
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    beerCardHeader: {
      maxHeight: '3.5rem',
    },
    beerCardContent: {
      flexGrow: 1,
    },
    tagArray: {
      margin: theme.spacing(1, 0),
    },
    tagChip: {
      margin: theme.spacing(0.25),
    },
    servingFormats: {
      margin: theme.spacing(1, 0),
    },
    servingFormatImage: {
      maxHeight: '85px',
      margin: theme.spacing(0.25),
    },
    actionArea: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    iconButton: {
      cursor: 'pointer',
    },
    upvoteIcon: {
      color: green[700],
      transform: 'rotate(270deg)',
    },
  }),
);

function BeerCard({ beer, upvote }: IBeerCardProps) {
  const classes = useStyles();
  const [profile] = useProfile();
  const titleStyle = {
    backgroundColor: BEER_COLOR_MAP[beer.srm - 1],
    color: beer.srm < 11 ? 'black' : 'white',
  };

  function handleUpvote() {
    if (profile?.email) {
      upvote(beer, profile);
    } else {
      // todo: snackbar
      window.alert('You must sign in to vote.');
    }
  }

  function abv(beer: IBeer): string {
    if (beer.status === EBeerStatus.AVAILABLE) {
      return beer.ABV ? `${beer.ABV.toFixed(1)}%` : '';
    }

    return `${beer.minABV.toFixed(1)}% - ${beer.maxABV.toFixed(1)}% ABV`;
  }

  function tags(beer: IBeer): React.ReactElement[] | null {
    if (!beer.tags) {
      return null;
    }

    return beer.tags.map((tag) => (
      <Chip className={classes.tagChip} label={tag} size="small" key={tag} />
    ));
  }

  function servingFormats(beer: IBeer): React.ReactElement[] | null {
    if (!beer.servingFormats?.length || beer.status !== EBeerStatus.AVAILABLE) {
      return null;
    }

    return beer.servingFormats.map((format) => {
      return (
        <img
          src={servingImageMap.get(format)}
          alt={format}
          className={classes.servingFormatImage}
          key={format}
        />
      );
    });
  }

  function upvoteButton(_profile: IProfile | null): React.ReactElement {
    if (_profile?.email) {
      return (
        <IconButton
          aria-label="upvote"
          onClick={handleUpvote}
          data-testid="upvoteButton"
          className={classes.iconButton}
        >
          <Forward className={classes.upvoteIcon} />
        </IconButton>
      );
    }

    return <></>;
  }

  function actions(beer: IBeer, _profile: IProfile | null): React.ReactElement {
    if (beer.status === EBeerStatus.VOTING) {
      return (
        <>
          <Typography variant="body2" color="textPrimary" component="p">
            {beer.votes} Votes
          </Typography>
          {upvoteButton(_profile)}
        </>
      );
    }
    return <></>;
  }

  // todo: add some indicator of a beer that's being brewed or available? Maybe configurable by props...
  // note: any other modifications for beers available vs. brewing or voting?
  // todo: an image from cloud storage.

  return (
    <Card className={classes.beerCard} raised={true} data-testid="beercard">
      <CardHeader
        title={beer.name}
        subheader={beer.style}
        style={titleStyle}
        subheaderTypographyProps={{ color: 'inherit' }}
      ></CardHeader>
      <CardContent className={classes.beerCardContent}>
        <Typography
          variant="body2"
          color="textPrimary"
          component="p"
          gutterBottom={true}
        >
          {beer.description}
        </Typography>
        <Typography
          variant="body2"
          color="textPrimary"
          component="p"
          gutterBottom={true}
        >
          {abv(beer)}
        </Typography>
        <div className={classes.tagArray}>{tags(beer)}</div>
        <div className={classes.servingFormats}>{servingFormats(beer)}</div>
      </CardContent>
      <CardActions className={classes.actionArea}>
        {actions(beer, profile)}
      </CardActions>
    </Card>
  );
}

export default BeerCard;
