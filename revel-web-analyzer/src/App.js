import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import {
  Report,
  AppForm,
} from './components';
import logo from './logo.png';
import theme from './theme';
import uniqueId from './utils/unique-id';

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
  },
}));

function createReport(id, url, onDelete) {
  return ({ id, url, onDelete });
}

function App() {
  const classes = useStyles();
  const [reports, setReports] = useState([]);

  const handleAnalyze = (url) => {
    const id = uniqueId();
    const onDelete = () => handleDeleteReport(id);

    setReports([
      createReport(id, url, onDelete),
      ...reports,
    ]);
  }

  const handleDeleteReport = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  }

  const handleClearReports = () => {
    setReports([]);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={classes.container}>
        <img className={classes.logo} src={logo} alt="logo" />
        <AppForm
          onSubmit={handleAnalyze}
          onClearReports={handleClearReports}
          disableClearReports={reports.length === 0}
        />
        <div>
          {
            reports.map((report) => (
              <Report key={report.id} {...report} />
            ))
          }
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
