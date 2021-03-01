import axios from 'axios';

export const esports = axios.create({
  baseURL: 'https://esports-api.lolesports.com/persisted/gw',
});

export const feed = axios.create({
  baseURL: 'https://feed.lolesports.com/livestats/v1',
});
