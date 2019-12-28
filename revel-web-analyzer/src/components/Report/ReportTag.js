import React from 'react';
import {
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: `0 ${spacing(1)}px`,
    margin: `${spacing(1)}px`,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: 4,
    display: 'inline-block',
  }
}));

function ReportTag(props) {
  const { children: tag } = props;
  const classes = useStyles();
  return (
    <Typography component="span" className={classes.root}>{tag}</Typography>
  );
}

export default ReportTag;
