import React, {
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import {
  IconButton,
  Typography,
  Paper,
  makeStyles,
  Grid,
} from '@material-ui/core';
import ReportItem from './ReportItem';
import ReportItemList from './ReportItemList';
import ReportTag from './ReportTag';
import {
  Delete as DeleteIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    margin: `${spacing(2)}px auto`,
    padding: `${spacing(2)}px`,
  },
  url: {
    color: '#2196f3',
    display: 'block',
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
}));


const renderPath = (pathToRender) => (
  pathToRender && <>
    {pathToRender.map((item) => (
      <ReportTag>{item}</ReportTag>
    ))}
  </>
);

function Report(props) {
  const { link, onDelete } = props;
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({});

  const classes = useStyles();

  useEffect(() => {
    async function analyze() {
      try {
        console.log('requesting');
        const response = await axios(`${window.location.origin}/analyze?url=${link}`);
        setLoading(false);
        setReport(response.data);
      } catch (e) {
        alert(e);
        onDelete();
      }
    }
    analyze();
  }, [link, onDelete]);


  return (
    <Paper className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography
            href={link}
            target="_blank"
            component="a"
            className={classes.url}
            noWrap
            variant="h5"
          >{link}</Typography>
        </Grid>
        <Grid item xs={1} container justify="flex-end" >
          <IconButton disabled={loading} aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>

      <ReportItemList loading={loading}>
        <ReportItem label={`Unique tags (count: ${(report.uniqueTags || []).length})`}>
          {renderPath(report.uniqueTags)}
        </ReportItem>
        <ReportItem label="Most commonly used tag">
          <ReportTag>{report.mostCommonlyUsedTag || ''}</ReportTag>
        </ReportItem>
        <ReportItem label={`Longest path from root (length: ${(report.lognestPathFromRoot || []).length})`}>
          {renderPath(report.lognestPathFromRoot)}
        </ReportItem>
        <ReportItem label={`Longest path from root with most commonly used tag within the path (length: ${(report.lognestPathFromRootWithCommonlyUsedTag || []).length})`}>
          {renderPath(report.lognestPathFromRootWithCommonlyUsedTag)}
        </ReportItem>
      </ReportItemList>
    </Paper>
  );
}

export default Report;
