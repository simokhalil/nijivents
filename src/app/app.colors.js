import AppConstants from './app.constants';

export default {
  palette: {
    primary: '#ff6347',
    white: '#ffffff',
  },

  tabs: {
    [AppConstants.ROUTES.homeTab]: {
      color: '#5b3db4',
      highlight: '#dfd8f2',
    },
    [AppConstants.ROUTES.favoritesTab]: {
      color: '#c73c9c',
      highlight: '#f5d7ee',
    },
    [AppConstants.ROUTES.settingsTab]: {
      color: '#1e94a9',
      highlight: '#d3ebef',
    },
  },
};
