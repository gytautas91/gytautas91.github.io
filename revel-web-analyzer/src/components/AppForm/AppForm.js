import React, { useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core';
import {
  URLField,
} from '../';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    marginTop: 150,
  },
  buttons: {
    margin: 0,
  },
  logo: {
    width: 220,
    margin: `${spacing(2)}px auto`,
    display: 'block',
  }
}));

const DEFAULT_PAGE = 'https://revelsystems.com/';

function validateUrl(url) {
  let validUrl = /^(?:(?:https?):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.?\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[?6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1?,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00?a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u?00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  return validUrl.test(url);
}

function AppForm(props) {
  const {
    onSubmit,
    onClearReports,
    disableClearReports
  } = props;
  const classes = useStyles();
  const [urlFieldValue, setUrlFieldValue] = useState(DEFAULT_PAGE);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUrl(urlFieldValue)) {
      setError('You must enter valid url')
    } else {
      onSubmit(urlFieldValue);
      setUrlFieldValue('');
    }
  }

  const handleUrlChange = (e) => {
    setError(null);
    setUrlFieldValue(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h2" align="center">Web analyzer</Typography>
      <URLField
        error={error}
        autoFocus
        onChange={handleUrlChange}
        placeholder="Type a URL"
        value={urlFieldValue}
      />
      <Grid className={classes.buttons} container spacing={4} justify="center">
        <Grid item>
          <Button
            type="submit"
            disabled={urlFieldValue.length === 0}
            variant="contained"
            color="primary"
          >
            Analyze
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={disableClearReports}
            variant="contained"
            color="secondary"
            onClick={onClearReports}
          >
            Clear reports
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AppForm;
