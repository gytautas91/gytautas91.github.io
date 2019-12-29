import React from 'react';
import {
  Typography,
  Grid,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  label: {
    fontWeight: 'bold',
  },
}));

function ReportItem(props) {
  const { label, children: content } = props;
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Typography className={classes.label}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        {content}
      </Grid>
    </Grid>
  );
}

export default ReportItem;
