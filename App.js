import React from 'react';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { Provider } from 'react-redux';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';

import CustomRouter from './src/utils/CustomRouter';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}
      >
        <CustomRouter />
      </ApplicationProvider>
    </Provider>
  );
}
