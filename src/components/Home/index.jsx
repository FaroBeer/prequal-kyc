import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginTop: 25,
    minWidth: 275,
    minHeight: 650,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 34,
  },
  pos: {
    fontSize: 20,
    marginBottom: 10,
  },
});

function Home(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.root}>
    <Grid container spacing={24}>
    <Grid item xs></Grid>
    <Grid item xs={6}>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="h5" component="h2">
				In this section we will ask you to provide information in order to begin the KYC (Know Your Customer) approval process.
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Welcome!
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs></Grid>
    </Grid>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
