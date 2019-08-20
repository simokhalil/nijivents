import React from 'react';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { Provider } from 'react-redux';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';

import AppRoutes from './src/app/app.routes';
import store from './src/redux/store';
import { customTheme } from './src/app/app.theme';

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider
        mapping={mapping}
        theme={customTheme}
      >
        <AppRoutes />
      </ApplicationProvider>
    </Provider>
  );
}
