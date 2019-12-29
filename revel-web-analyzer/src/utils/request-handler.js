import axios from 'axios';

export default async function makeRequest(url, config) {
  const {
    REACT_APP_SERVER_ADDRESS,
    REACT_APP_SERVER_PORT
  } = process.env;

  const origin = REACT_APP_SERVER_ADDRESS && REACT_APP_SERVER_PORT
    ? `//${REACT_APP_SERVER_ADDRESS}:${REACT_APP_SERVER_PORT}`
    : `//${window.location.hostname}:8080`;

  const response = await axios(`${origin}${url}`, config);
  return response.data;
}
