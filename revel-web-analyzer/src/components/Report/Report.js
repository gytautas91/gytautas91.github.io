import React, {
  useEffect,
  useState,
} from 'react';
import {
  IconButton,
  Typography,
  Paper,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import ReportItem from './ReportItem';
import ReportItemList from './ReportItemList';
import ReportTag from './ReportTag';
import {
  Delete as DeleteIcon,
} from '@material-ui/icons';
import uniqueId from '../../utils/unique-id';
import makeRequest from '../../utils/request-handler';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    margin: `${spacing(2)}px auto`,
    padding: `${spacing(2)}px`,
  },
  url: {
    color: blue[500],
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
      <ReportTag key={uniqueId()}>{item}</ReportTag>
    ))}
  </>
);

function Report(props) {
  const { url, onDelete } = props;
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    uniqueTags: [],
    lognestPathFromRoot: [],
    lognestPathFromRootWithCommonlyUsedTag: [],
    mostCommonlyUsedTag: '',
  });

  const {
    uniqueTags,
    lognestPathFromRoot,
    lognestPathFromRootWithCommonlyUsedTag,
    mostCommonlyUsedTag,
  } = report;

  const classes = useStyles();

  useEffect(() => {
    async function analyze() {
      try {
        const data = await makeRequest(`/analyze?url=${url}`)
        setLoading(false);
        setReport(data);
      } catch (e) {
        alert(e);
        onDelete();
      }
    }
    analyze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Paper className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography
            href={url}
            target="_blank"
            component="a"
            className={classes.url}
            noWrap
            variant="h5"
          >
            {url}
          </Typography>
        </Grid>
        <Grid item xs={1} container justify="flex-end" >
          <IconButton disabled={loading} aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>

      <ReportItemList loading={loading}>
        <ReportItem
          label={`Unique tags (count: ${uniqueTags.length})`}
        >
          {renderPath(uniqueTags)}
        </ReportItem>
        <ReportItem
          label="Most commonly used tag"
        >
          <ReportTag>{mostCommonlyUsedTag}</ReportTag>
        </ReportItem>
        <ReportItem
          label={`Longest path from root (length: ${lognestPathFromRoot.length})`}
        >
          {renderPath(lognestPathFromRoot)}
        </ReportItem>
        <ReportItem
          label={`Longest path from root with most commonly used tag within the path (length: ${lognestPathFromRootWithCommonlyUsedTag.length})`}
        >
          {renderPath(report.lognestPathFromRootWithCommonlyUsedTag)}
        </ReportItem>
      </ReportItemList>
    </Paper>
  );
}

export default Report;
