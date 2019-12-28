import React from 'react';
import {
  Typography,
  Grid,
} from '@material-ui/core';

function ReportItem(props) {
  const { label, children: content } = props;
  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        {content}
      </Grid>
    </Grid >
  );
}

export default ReportItem;
