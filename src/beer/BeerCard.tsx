import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Forward from '@material-ui/icons/Forward';
import { green } from '@material-ui/core/colors';

import { IBeer, IBeerCardProps, EBeerStatus } from './beerTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    beerCard: {
      maxWidth: '33%',
    },
    upvoteIcon: {
      color: green[700],
      transform: 'rotate(270deg)',
    },
  }),
);

const BeerCard: React.FC<IBeerCardProps> = ({ beer, upvote }) => {
  const classes = useStyles();

  const abv = (beer: IBeer) => {
    if (beer.status === EBeerStatus.AVAILABLE) {
      return (
        <Typography variant="body2" color="textPrimary" component="p">
          {beer.ABV}%
        </Typography>
      );
    }

    return (
      <Typography variant="body2" color="textPrimary" component="p">
        {beer.minABV}% - {beer.maxABV}% ABV
      </Typography>
    );
  };

  const handleUpvote = () => {
    upvote(beer);
  };

  // todo: add some indicator of a beer that's being brewed or available? Maybe configurable by props...
  // note: any other modifications for beers available vs. brewing or voting?
  // todo: tags (pills), serving formats (images/icons). Avatar? Colored header vaguely based on SRM?
  // todo: an image from cloud storage.

  return (
    <Card className={classes.beerCard}>
      <CardHeader title={beer.name} subheader={beer.style}></CardHeader>
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {beer.description}
        </Typography>
        {abv(beer)}
      </CardContent>
      <CardActions>
        <Typography variant="body2" color="textPrimary" component="p">
          {beer.votes} Votes
        </Typography>
        <IconButton
          aria-label="upvote"
          onClick={handleUpvote}
          data-testid="upvoteButton"
        >
          <Forward className={classes.upvoteIcon} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BeerCard;
