import React from 'react';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { GalioProvider } from 'galio-framework';

import AppRoutes from './src/app/app.routes';
import AppTheme from './src/app/app.theme';
import store from './src/redux/store';
import { userDB, firebase } from './src/firebase';

class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'museo-bold': require('./src/assets/fonts/MuseoBold.ttf'),
    });

    this.userAuthStateChangedUnsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
      console.log('AppContainer : Got authUser', authUser);
      if (authUser) {
        let infos = {
          email: authUser.email,
          uid: authUser.uid,
          displayName: authUser.displayName,
          emailVerified: authUser.emailVerified,
        };

        store.dispatch({
          type: 'USER_SIGNED_IN',
          data: { ...infos },
        });

        userDB.onceGetUser(infos.uid)
          .then((user) => {
            const userData = user.data();
            infos = {
              ...infos,
              ...userData,
            };

            console.log('got user data : ', userData);

            store.dispatch({
              type: 'USER_SIGNED_IN',
              data: { ...infos },
            });

            store.dispatch({
              type: 'GET_USER_SAGA',
            });
          });
      } else {
        store.dispatch({
          type: 'GET_USER_CANCEL',
        });

        store.dispatch({
          type: 'USER_SIGNED_OUT',
        });

        console.log('user not logged in => redirecting from ', this.props);
      }
    });
  }

  componentWillUnmount() {
    if (this.userAuthStateChangedUnsubscribe) {
      this.userAuthStateChangedUnsubscribe();
    }
  }

  render() {
    return (
      <Provider store={store}>
        <GalioProvider theme={AppTheme}>
          <AppRoutes />
        </GalioProvider>
      </Provider>
    );
  }
}

export default App;
