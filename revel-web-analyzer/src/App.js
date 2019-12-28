import React, { useState, Fragment } from 'react';
import {
  Container,
  CssBaseline,
  Typography,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core';
import {
  URLField,
  Report,
} from './components';
import logo from './logo.png';

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

function App() {
  const classes = useStyles();
  const [reports, setReports] = useState([]);
  const [urlFieldValue, setUrlFieldValue] = useState(DEFAULT_PAGE);
  const [error, setError] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (reports.indexOf(urlFieldValue) !== -1) {
      setError('Provided url already exists')
    } else if (!validateUrl(urlFieldValue)) {
      setError('You must enter valid url')
    }

    setReports([urlFieldValue, ...reports]);
    setUrlFieldValue('');
  }

  const handleUrlChange = (e) => {
    setError(null);
    setUrlFieldValue(e.target.value);
  }

  const handleDeleteReport = (index) => {
    setReports(reports.filter((_, i) => i !== index));
  }

  const handleClearReports = (e) => {
    setReports([]);
  }

  return (
    <Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <img className={classes.logo} src={logo} alt="logo" />
        <form onSubmit={handleAnalyze}>

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
                disabled={reports.length === 0}
                variant="contained"
                color="secondary"
                onClick={handleClearReports}
              >
                Clear reports
              </Button>
            </Grid>
          </Grid>
          <div className={classes.reportList}>
            {
              reports.map((link, i) => (
                <Report
                  key={link}
                  link={link}
                  onDelete={() => handleDeleteReport(i)}
                />
              ))
            }
          </div>
        </form>
      </Container>
    </Fragment>
  );
}

export default App;
