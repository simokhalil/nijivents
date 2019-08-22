import React from 'react';
import { Provider } from 'react-redux';

import { GalioProvider } from 'galio-framework';

import AppRoutes from './src/app/app.routes';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <GalioProvider>
        <AppRoutes />
      </GalioProvider>
    </Provider>
  );
}
