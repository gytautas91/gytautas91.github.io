import axios from 'axios';

if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

export default async function makeRequest(url, config) {
  const {
    REACT_APP_SERVER_ADDRESS,
    REACT_APP_SERVER_PORT
  } = process.env;

  const origin = REACT_APP_SERVER_ADDRESS && REACT_APP_SERVER_PORT ?
    `//${REACT_APP_SERVER_ADDRESS}:${REACT_APP_SERVER_PORT}`
    : window.location.origin;

  const response = await axios(`${origin}${url}`, config);
  return response.data;
}
