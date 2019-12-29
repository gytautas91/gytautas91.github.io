import React from 'react';
import {
  Typography,
  makeStyles,
  LinearProgress,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    '& > *': {
      padding: `${spacing(1)}px ${spacing(2)}px`,
    },
    '& > :nth-child(2n)': {
      background: grey[100],
    },
    '& .MuiSkeleton-root': {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      margin: `${spacing(2)}px 0`,
    }
  }
}));

function ReportItemList(props) {
  const { children, loading } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        loading ? <>
          <Typography align="center">
            Analyzing
          </Typography>
          <LinearProgress />
        </> : children
      }
    </div>
  );
}

export default ReportItemList;
